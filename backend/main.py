import os
import re
import shutil
import tempfile
import time
import unicodedata
from typing import Optional

import torch
import whisper
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# ---------------------------------------------------------------------------
# 1. FastAPI app initialization
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Indic Live Translation & ASR API",
    description="ASR + Auto Language Detection + Code-Mixed Translation for Indic Languages",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# 2. Language code mappings
# ---------------------------------------------------------------------------
NLLB_LANG_CODES = {
    "ta": "tam_Taml",  # Tamil
    "en": "eng_Latn",  # English
    "hi": "hin_Deva",  # Hindi
    "te": "tel_Telu",  # Telugu
    "ml": "mal_Mlym",  # Malayalam
    "kn": "kan_Knda",  # Kannada
}

SUPPORTED_LANGUAGES = {
    "ta": "Tamil",
    "en": "English",
    "hi": "Hindi",
    "te": "Telugu",
    "ml": "Malayalam",
    "kn": "Kannada",
}

# language codes accepted in /translate source_language (translate endpoint)
TRANSLATE_SOURCE_LANGS = set(NLLB_LANG_CODES.keys()) | {"auto"}

# language codes accepted in /translate target_language
TRANSLATE_TARGET_LANGS = set(NLLB_LANG_CODES.keys())

# ---------------------------------------------------------------------------
# 3. Romanized Indic word dictionaries for code-mix detection
#    Each entry is a set of common romanized words strongly associated
#    with that language.  These are NOT transliteration tables — they are
#    lexical fingerprints only.
# ---------------------------------------------------------------------------
TAMIL_ROMAN_WORDS = {
    "naan", "naanu", "naan", "innu", "inniku", "ivanga", "avan", "aval",
    "avar", "enna", "enga", "eppen", "sollu", "solren", "poren", "vandhen",
    "irukken", "irukku", "paarukiren", "thevai", "romba", "konjam",
    "panniten", "pannrom", "panren", "vandhuttom", "pogiren", "varuvom",
    "paaru", "kelvi", "pidikuthu", "pidikkuthu", "theriyathu", "theriyum",
    "vanthutten", "sollunga", "vaanga", "ponga", "inga", "anga", "enna",
    "yenna", "yaar", "eppo", "ethana", "ettanai", "college-ku", "ku",
    "kku", "mani", "naalekki", "mela", "keela", "kooda", "kuda", "oda",
    "kitta", "ellam", "ellarum", "onnum", "oruthar", "apdiya", "appo",
    "appuram", "kadaisi", "mudiyala", "mudiyum", "mudinchuthu", "nandri",
    "vanakkam", "vazhga", "kalloori", "pallikoodam",
}

HINDI_ROMAN_WORDS = {
    "main", "mujhe", "hum", "aap", "yeh", "woh", "kya", "kyun", "kahan",
    "kab", "kaun", "kal", "aaj", "abhi", "thoda", "bahut", "accha", "theek",
    "hoon", "hai", "hain", "tha", "the", "thi", "jaa", "raha", "rahi",
    "rahe", "karo", "karna", "karenge", "gaya", "gayi", "aayi", "aaya",
    "baat", "bhai", "yaar", "dost", "matlab", "lekin", "magar", "phir",
    "toh", "waise", "matlab", "suno", "dekho", "nahi", "nahin", "hoga",
    "milenge", "bolo", "bolna", "samjhe", "samajh", "zaroor", "bilkul",
    "sirf", "bas", "sab", "kuch", "log", "ghar", "kaam", "paisa", "time",
    "meeting-mein", "chalte", "jata", "jati", "jate",
}

MALAYALAM_ROMAN_WORDS = {
    "njan", "njaan", "avan", "aval", "avr", "avar", "nee", "ningal",
    "enthu", "engane", "evide", "eppo", "innu", "innu", "nale", "kande",
    "parayoo", "parayu", "varu", "varum", "poyi", "pokum", "untu", "illa",
    "venam", "venda", "aanu", "aayirunnu", "cheytu", "cheyyan", "onnu",
    "randu", "moonnu", "nalu", "kollam", "nannay", "sadhanam", "koode",
    "kood", "aayi", "alle", "alle", "angu", "ingu", "enthina", "adipoli",
    "college-il", "il", "school-il",
}

TELUGU_ROMAN_WORDS = {
    "nenu", "meeru", "vaalllu", "adi", "idi", "emi", "ela", "ekkada",
    "eppudu", "evaru", "veltunnanu", "vastunnanu", "chestunnanu", "undi",
    "ledu", "avutundi", "cheppandi", "cheppanu", "poyanu", "vachanu",
    "chala", "konjam", "bagundi", "manchidi", "telugu", "anduke", "kaani",
    "aithe", "ante", "inkaa", "ippudu", "college-ki", "ki", "school-ki",
}

# Unicode ranges used to detect native scripts
TAMIL_UNICODE_RANGE = range(0x0B80, 0x0BFF)
DEVANAGARI_RANGE = range(0x0900, 0x097F)
MALAYALAM_RANGE = range(0x0D00, 0x0D7F)
TELUGU_RANGE = range(0x0C00, 0x0C7F)
KANNADA_RANGE = range(0x0C80, 0x0CFF)


# ---------------------------------------------------------------------------
# 4. Important-entity preservation (names, numbers, URLs, acronyms, etc.)
# ---------------------------------------------------------------------------
_PRESERVE_PATTERN = re.compile(
    r"(?:"
    r"\b[A-Z][a-zA-Z0-9]*(?:\s[A-Z][a-zA-Z0-9]*)+"   # Proper names: Google Meet
    r"|https?://\S+"                                    # URLs
    r"|\b[A-Z]{2,}\b"                                   # Acronyms: AI, ML, NLP
    r"|\b\d+(?:[:.]\d+)*\s*(?:AM|PM|am|pm)?\b"         # Numbers / times
    r"|\b[A-Z][a-zA-Z0-9_.-]*\b"                       # CamelCase / brand names
    r")"
)


def extract_entities(text: str) -> list[str]:
    """Return a list of named entities / preserved tokens found in text."""
    return _PRESERVE_PATTERN.findall(text)


# ---------------------------------------------------------------------------
# 5. Script-based language detection helper
# ---------------------------------------------------------------------------
def _count_chars_in_ranges(text: str, *ranges) -> int:
    total = 0
    for ch in text:
        cp = ord(ch)
        for r in ranges:
            if cp in r:
                total += 1
                break
    return total


def _romanized_lang_score(tokens: list[str], word_set: set) -> float:
    """Fraction of tokens that appear in the given romanized vocabulary."""
    if not tokens:
        return 0.0
    hits = sum(1 for t in tokens if t.lower() in word_set)
    return hits / len(tokens)


def detect_language_or_code_mix(text: str, whisper_lang: Optional[str] = None) -> dict:
    """
    Classify the language / code-mix type of *text*.

    Returns a dict:
        {
          "detected_language": "ta" | "en" | "hi" | "te" | "ml" | "kn" | "mixed",
          "code_mixed": True | False,
          "detection_reason": str,
          "detection_confidence": "high" | "medium" | "low",
        }

    Strategy (in priority order):
      1. Check for native Unicode script characters.
      2. Score romanized word lists for Tanglish / Hinglish / Manglish / Tenglish.
      3. Use Whisper's own language prediction as a tiebreaker.
      4. Fall back to 'en' with low confidence.
    """
    if not text or not text.strip():
        return {
            "detected_language": whisper_lang or "en",
            "code_mixed": False,
            "detection_reason": "empty_input",
            "detection_confidence": "low",
        }

    # --- Step 1: Unicode script detection --------------------------------
    tamil_chars  = _count_chars_in_ranges(text, TAMIL_UNICODE_RANGE)
    deva_chars   = _count_chars_in_ranges(text, DEVANAGARI_RANGE)
    malay_chars  = _count_chars_in_ranges(text, MALAYALAM_RANGE)
    telugu_chars = _count_chars_in_ranges(text, TELUGU_RANGE)
    kannada_chars = _count_chars_in_ranges(text, KANNADA_RANGE)

    script_scores = {
        "ta": tamil_chars,
        "hi": deva_chars,
        "ml": malay_chars,
        "te": telugu_chars,
        "kn": kannada_chars,
    }
    best_script_lang = max(script_scores, key=script_scores.get)
    best_script_count = script_scores[best_script_lang]

    # Total non-ASCII letters as a denominator for ratio
    total_chars = max(len(text.strip()), 1)
    script_ratio = best_script_count / total_chars

    if script_ratio > 0.15:
        # Dominant native script detected
        # Check if there are also significant Latin characters → code-mixed
        latin_count = sum(1 for ch in text if ch.isascii() and ch.isalpha())
        latin_ratio = latin_count / total_chars
        code_mixed = latin_ratio > 0.2

        return {
            "detected_language": best_script_lang,
            "code_mixed": code_mixed,
            "detection_reason": f"unicode_script({'code_mixed' if code_mixed else 'pure'})",
            "detection_confidence": "high" if script_ratio > 0.5 else "medium",
        }

    # --- Step 2: Romanized word-list scoring ----------------------------
    tokens = re.findall(r"[a-zA-Z]+(?:-[a-zA-Z]+)*", text)
    roman_scores = {
        "ta": _romanized_lang_score(tokens, TAMIL_ROMAN_WORDS),
        "hi": _romanized_lang_score(tokens, HINDI_ROMAN_WORDS),
        "ml": _romanized_lang_score(tokens, MALAYALAM_ROMAN_WORDS),
        "te": _romanized_lang_score(tokens, TELUGU_ROMAN_WORDS),
    }

    best_roman_lang = max(roman_scores, key=roman_scores.get)
    best_roman_score = roman_scores[best_roman_lang]

    if best_roman_score >= 0.25:
        # At least 25% of tokens are recognised romanized Indic words
        return {
            "detected_language": best_roman_lang,
            "code_mixed": True,         # Romanized → always considered code-mixed
            "detection_reason": f"romanized_word_match(score={best_roman_score:.2f})",
            "detection_confidence": "medium" if best_roman_score < 0.5 else "high",
        }

    # --- Step 3: Trust Whisper's prediction if not English ---------------
    if whisper_lang and whisper_lang != "en" and whisper_lang in SUPPORTED_LANGUAGES:
        return {
            "detected_language": whisper_lang,
            "code_mixed": False,
            "detection_reason": "whisper_prediction",
            "detection_confidence": "medium",
        }

    # --- Step 4: Fallback — treat as English or use whisper hint ---------
    fallback = whisper_lang if whisper_lang else "en"
    return {
        "detected_language": fallback,
        "code_mixed": False,
        "detection_reason": "fallback",
        "detection_confidence": "low",
    }


# ---------------------------------------------------------------------------
# 6. Load models once at startup
# ---------------------------------------------------------------------------
print("Loading Whisper ASR model (medium)...")
asr_model = whisper.load_model("medium")
print("Whisper ASR model loaded successfully!")

NLLB_MODEL_NAME = "facebook/nllb-200-distilled-600M"
print(f"Loading Translation model ({NLLB_MODEL_NAME})...")
nllb_tokenizer = AutoTokenizer.from_pretrained(NLLB_MODEL_NAME)
nllb_model = AutoModelForSeq2SeqLM.from_pretrained(NLLB_MODEL_NAME)
print("Translation model loaded successfully!")


# ---------------------------------------------------------------------------
# 7. Pydantic models
# ---------------------------------------------------------------------------
class TranslateRequest(BaseModel):
    text: str = Field(..., description="Text to translate", min_length=1)
    source_language: str = Field(
        "ta",
        description="Source language code: 'ta','en','hi','te','ml','kn', or 'auto'",
    )
    target_language: str = Field(
        "en",
        description="Target language code: 'ta','en','hi','te','ml','kn'",
    )


class TranslateResponse(BaseModel):
    source_language: str
    target_language: str
    original_text: str
    translated_text: str


# ---------------------------------------------------------------------------
# 8. Internal translation helper (used by both /translate and /transcribe chain)
# ---------------------------------------------------------------------------
def _run_nllb_translation(text: str, src_lang: str, tgt_lang: str) -> str:
    """Translate *text* from *src_lang* to *tgt_lang* using the NLLB model."""
    if src_lang == tgt_lang:
        return text
    src_code = NLLB_LANG_CODES[src_lang]
    tgt_code = NLLB_LANG_CODES[tgt_lang]

    nllb_tokenizer.src_lang = src_code
    inputs = nllb_tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    forced_bos_token_id = nllb_tokenizer.convert_tokens_to_ids(tgt_code)
    with torch.no_grad():
        generated_tokens = nllb_model.generate(
            **inputs,
            forced_bos_token_id=forced_bos_token_id,
            max_length=256,
        )

    return nllb_tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0].strip()


# ---------------------------------------------------------------------------
# 9. Endpoints
# ---------------------------------------------------------------------------

@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    """Health check — verifies ASR and translation models are loaded."""
    return {
        "status": "ok",
        "message": "Indic Live Backend is running.",
        "asr_model": "whisper-medium",
        "translation_model": NLLB_MODEL_NAME,
        "supported_languages": SUPPORTED_LANGUAGES,
        "features": ["auto_language_detection", "code_mixed_speech", "romanized_indic"],
    }


@app.post("/transcribe", tags=["Speech-to-Text"])
async def transcribe_audio(
    file: UploadFile = File(..., description="Audio file (.wav, .mp3, .m4a, .ogg, .mp4, etc.)"),
    language: Optional[str] = Form(
        None,
        description=(
            "Language code ('ta','en','hi','te','ml','kn') or 'auto' for automatic detection. "
            "Leave blank for Whisper auto-detection."
        ),
    ),
):
    """
    Convert audio speech to text.  Supports:
    - Explicit language codes: 'ta', 'en', 'hi', 'te'
    - 'auto' or empty → Whisper detects the dominant language
    - Code-mixed / romanized speech analysis via detect_language_or_code_mix()

    Response always includes: filename, language, text, detected_language,
    code_mixed, detection_confidence, processing_time_seconds.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    lang_input = (language or "").strip().lower()
    # Treat "auto" and blank identically — let Whisper decide
    explicit_lang = lang_input if lang_input and lang_input != "auto" else None

    file_ext = os.path.splitext(file.filename)[1] or ".wav"
    temp_path = None

    try:
        temp_audio_file = tempfile.NamedTemporaryFile(delete=False, suffix=file_ext)
        temp_path = temp_audio_file.name
        shutil.copyfileobj(file.file, temp_audio_file)
        temp_audio_file.close()
        file.file.close()

        transcribe_options = {
            "task": "transcribe",
            "fp16": torch.cuda.is_available(),
            "temperature": 0.0,
            "condition_on_previous_text": True,
            "beam_size": 5,
            "best_of": 5,
        }
        if explicit_lang:
            transcribe_options["language"] = explicit_lang

        start_time = time.time()
        result = asr_model.transcribe(temp_path, **transcribe_options)
        processing_duration = round(time.time() - start_time, 2)

        recognized_text = result.get("text", "").strip()
        whisper_lang = result.get("language", explicit_lang or "unknown")

        # Run language / code-mix analysis on the transcribed text
        detection = detect_language_or_code_mix(recognized_text, whisper_lang)

        return {
            "filename": file.filename,
            "language": lang_input if lang_input else "auto",
            "text": recognized_text,
            "detected_language": detection["detected_language"],
            "code_mixed": detection["code_mixed"],
            "detection_reason": detection["detection_reason"],
            "detection_confidence": detection["detection_confidence"],
            "processing_time_seconds": processing_duration,
        }

    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(exc)}")

    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except (PermissionError, OSError):
                pass


@app.post("/translate", tags=["Translation"])
async def translate_text(request: TranslateRequest):
    """
    Translate text between Indic languages and English.

    source_language accepts:
      - 'ta', 'en', 'hi', 'te', 'ml', 'kn'   → translate directly
      - 'auto'                                  → run detect_language_or_code_mix()
                                                  then translate from detected language

    target_language must be one of: 'ta', 'en', 'hi', 'te', 'ml', 'kn'

    Response fields:
      source_language, target_language, original_text, translated_text
    Optional fields added (do NOT remove existing fields):
      detected_language, code_mixed, detection_confidence
    """
    source_lang_input = request.source_language.strip().lower()
    target_lang = request.target_language.strip().lower()
    text = request.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    if source_lang_input not in TRANSLATE_SOURCE_LANGS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported source_language: '{source_lang_input}'. "
                   f"Supported: {sorted(TRANSLATE_SOURCE_LANGS)}",
        )
    if target_lang not in TRANSLATE_TARGET_LANGS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported target_language: '{target_lang}'. "
                   f"Supported: {sorted(TRANSLATE_TARGET_LANGS)}",
        )

    # --- Auto-detect source language ------------------------------------
    detection_info = {}
    if source_lang_input == "auto":
        detection = detect_language_or_code_mix(text, whisper_lang=None)
        resolved_source = detection["detected_language"]
        # If detected "mixed" or unsupported, fall back to English
        if resolved_source not in NLLB_LANG_CODES:
            resolved_source = "en"
        detection_info = {
            "detected_language": resolved_source,
            "code_mixed": detection["code_mixed"],
            "detection_confidence": detection["detection_confidence"],
        }
    else:
        resolved_source = source_lang_input
        detection_info = {
            "detected_language": resolved_source,
            "code_mixed": False,
            "detection_confidence": "high",
        }

    try:
        translated_text = _run_nllb_translation(text, resolved_source, target_lang)

        return {
            # Required existing fields
            "source_language": source_lang_input,
            "target_language": target_lang,
            "original_text": text,
            "translated_text": translated_text,
            # Added optional fields (non-breaking additions)
            **detection_info,
        }

    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Translation error: {str(exc)}")
