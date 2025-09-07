import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchIntensity?: number;
}

export function GlitchText({ children, className = '', glitchIntensity = 0.1 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [glitchIntensity]);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 1, 0],
        textShadow: [
          '0 0 0 transparent',
          '2px 0 0 #ff0080, -2px 0 0 #00ffff',
          '-2px 0 0 #ff0080, 2px 0 0 #00ffff',
          '1px 0 0 #ff0080, -1px 0 0 #00ffff',
          '0 0 0 transparent'
        ]
      } : {}}
      transition={{ duration: 0.2 }}
    >
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-cyan-400 opacity-70"
            style={{ transform: 'translateX(2px)' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-pink-500 opacity-70"
            style={{ transform: 'translateX(-2px)' }}
          >
            {children}
          </span>
        </>
      )}
    </motion.div>
  );
}
