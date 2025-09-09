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
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
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