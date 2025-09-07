import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillsRadarProps {
  skills: Skill[];
  title: string;
  color: string;
}

export function SkillsRadar({ skills, title, color }: SkillsRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar circles
      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}30`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw radar lines
      const angleStep = (Math.PI * 2) / skills.length;
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${color}30`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw skill points and connections
      ctx.beginPath();
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const skillRadius = (skills[i].level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * skillRadius;
        const y = centerY + Math.sin(angle) * skillRadius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = `${color}20`;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw skill points
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const skillRadius = (skills[i].level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * skillRadius;
        const y = centerY + Math.sin(angle) * skillRadius;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `${color}40`;
        ctx.fill();
      }

      // Draw skill labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px "Courier New", monospace';
      ctx.textAlign = 'center';
      
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = maxRadius + 20;
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        
        ctx.fillText(skills[i].name, x, y);
        ctx.fillText(`${skills[i].level}%`, x, y + 15);
      }
    };

    drawRadar();
  }, [skills, color]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black/60 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white font-mono mb-4 text-center">
        {title}
      </h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="w-full max-w-[300px] mx-auto"
      />
    </motion.div>
  );
}
