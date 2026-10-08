import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SupportedLanguages from '../components/SupportedLanguages';
import InteractiveTranslatorDemo from '../components/InteractiveTranslatorDemo';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStartTranslation = () => {
    navigate('/translate');
  };

  return (
    <div className="app-wrapper">
      {/* Ambient Lighting Background */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Navigation Bar */}
      <Navbar onStartTranslation={handleStartTranslation} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onStartTranslation={handleStartTranslation} />

        {/* Supported Languages Section */}
        <SupportedLanguages />

        {/* Interactive Translation Demo Preview */}
        <InteractiveTranslatorDemo />

        {/* How It Works Architecture Pipeline */}
        <HowItWorks />

        {/* Features & Key Innovations */}
        <Features />

        {/* Call to Action with Large Button */}
        <CallToAction onStartTranslation={handleStartTranslation} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
