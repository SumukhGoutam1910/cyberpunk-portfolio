import { motion } from 'framer-motion';
import { Code, Home, Mail, User, Zap, Quote } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
            >
              {/* Animated SVG logo (white fill) */}
              <motion.svg
                className="w-10 h-7"
                viewBox="0 3.3499999046325684 74.05000305175781 52.85000228881836"
                aria-hidden="true"
                focusable="false"
                fill="#ffffff"
                initial={{ rotate: 0, filter: 'drop-shadow(0 0 0px rgba(0,255,255,0))' }}
                animate={{
                  rotate: [0, 2, -2, 0],
                  filter: [
                    'drop-shadow(0 0 0px rgba(0,255,255,0))',
                    'drop-shadow(0 0 8px rgba(0,255,255,0.55))',
                    'drop-shadow(0 0 0px rgba(0,255,255,0))',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{
                  scale: 1.08,
                  rotate: 5,
                  filter: 'drop-shadow(0 0 12px rgba(0,255,255,0.8))',
                }}
              >
                <defs />
                <g fill="#ffffff">
                  <g transform="translate(0, 0)">
                    <path d="M12.25 44.60Q6.55 44.60 3.25 42.60Q0 40.55 0 37.25Q0 33.60 3.60 30.40Q7.45 27 13.70 25.80Q14.55 25.65 15.50 25.55Q16.45 25.45 17.40 25.45Q23.20 25.45 25.25 28.25Q25.45 28.50 25.45 28.90Q25.45 29.70 25 29.15Q23.20 26.60 17.15 26.60Q15.25 26.60 13.75 26.90Q8.50 27.90 5.40 30.85Q2.45 33.65 2.45 36.80Q2.45 39.80 5.15 41.60Q7.80 43.40 12.35 43.40Q16.65 43.40 20.30 42.38Q23.95 41.35 27 39.50Q32.00 36.45 32.00 31.40Q32.00 25.60 24.75 20.95Q22.90 19.75 21.65 18.82Q20.40 17.90 19.70 17.25Q17.05 14.70 17.05 11.85Q17.05 11.10 17.20 10.45Q17.90 7.20 21.55 5.20Q24.90 3.35 28.80 3.35Q33.25 3.35 35.55 4.90Q37.20 6 37.20 8.25Q37.20 9.70 36.35 10.95Q35.55 12.15 34.25 12.15Q33.30 12.15 32.55 11.40Q31.90 10.75 31.90 9.85Q31.90 7.45 34.25 7.45Q35.65 7.45 35.95 8.35Q36.20 7 34.90 6Q32.85 4.40 29.55 4.40Q26.10 4.40 23.25 6.35Q20.20 8.40 20.20 11.10Q20.20 14.60 26.60 18.30Q35.55 23.40 35.55 30.10Q35.55 33.05 33.65 35.80Q31.75 38.60 28.60 40.40Q21.40 44.60 12.25 44.60ZM44.20 56.20Q42.15 56.20 40.70 55.25Q38.95 54.20 38.95 52.15Q38.95 48.50 41.95 48.50Q42.90 48.50 43.60 49.20Q44.15 49.80 44.15 50.70Q44.15 51.90 43.25 52.65Q42.45 53.40 41.45 53.40Q40.45 53.40 39.75 52.65Q40 54.30 42.60 54.30Q47.85 54.30 52.95 46.90Q57.70 40 61.50 31.15Q55.25 40.25 49 40.25Q43.95 40.25 41.45 37.45Q39.25 34.95 39.25 30.70Q39.25 24.80 42.95 19Q40.35 17.85 38.60 16Q36.80 13.95 36.80 11.75Q36.80 8.60 39.70 6.90Q41.85 5.60 44.85 5.60Q50 5.60 53.80 8.95Q61.10 4.75 67.90 4.75Q74.05 4.75 74.05 7.95Q74.05 11.20 68.70 15.05Q61.30 20.30 50.45 20.30Q49.60 20.30 48.80 20.25Q48 20.20 47.25 20.10Q43 26.75 43 32.10Q43 35.35 44.70 37.05Q46.45 38.80 49 38.80Q52.80 38.80 56.60 35.30Q58.95 33.10 62.15 28.60L62.35 28.25Q62.50 26.20 62.55 26.10Q62.65 25.30 62.85 24.63Q63.05 23.95 63.35 23.30Q64.35 21.40 65.75 21.40Q67.15 21.40 67.15 23.05Q67.15 24.85 65.15 27.30Q64.90 27.65 64.50 28.05Q64.10 28.45 63.55 28.95Q63.30 29.05 62.80 30.55Q61.85 33.60 60.98 36.70Q60.10 39.80 59.10 42.85Q57.95 46.30 56.08 48.85Q54.20 51.40 51.80 53.20Q47.85 56.20 44.20 56.20M50.60 19.20Q52.95 19.20 55.35 18.75Q58.70 18.10 61.88 16.75Q65.05 15.40 68 13.25Q68.75 12.70 69.43 12.05Q70.10 11.40 70.75 10.60Q72.15 8.85 72.15 7.55Q72.15 5.70 69.05 5.70Q62.25 5.70 55.60 10.85Q56.70 12.15 57.35 13.65Q57.50 13.95 57.10 14.05L56.95 14.05Q56.60 14.05 56.45 13.80Q55.90 12.95 54.75 11.50Q50.95 14.70 48 19Q48.70 19.10 49.33 19.15Q49.95 19.20 50.60 19.20M43.75 17.80Q47.20 13.05 52.70 9.60Q48.85 6.65 44.70 6.65Q42.50 6.65 40.90 7.70Q38.90 9 38.90 11.60Q38.90 15.70 43.75 17.80Z" />
                  </g>
                </g>
              </motion.svg>

              <span className="text-white font-mono font-bold text-lg">
                <span>PORT</span>
                <span className="text-cyan-400">FOLIO</span>
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-mono text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-500/20 border border-cyan-400/50'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div
                  className="w-full h-0.5 bg-cyan-400"
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-cyan-400"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-cyan-400"
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Backdrop (tap to close) */}
        {isOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden bg-black/90 backdrop-blur-md border-t border-cyan-500/30"
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 py-4 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-mono text-base transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-400 bg-cyan-500/20 border border-cyan-400/50'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-3 h-3 rounded-full border-2 transition-all ${
                activeSection === item.id
                  ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'bg-transparent border-gray-500 hover:border-cyan-400'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
}