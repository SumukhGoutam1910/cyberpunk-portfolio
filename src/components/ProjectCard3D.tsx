import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

export function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-black/80 border border-cyan-500/30 rounded-lg overflow-hidden backdrop-blur-sm"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1"
        animate={isHovered ? {
          y: [0, 300, 0],
          opacity: [0, 1, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Badges row (moved from image area) */}
        <div className="flex items-center justify-between">
          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full backdrop-blur-sm">
            <span className="text-cyan-400 text-sm font-mono">{project.category}</span>
          </div>
          {project.featured && (
            <div className="p-2 bg-pink-500/20 border border-pink-400/50 rounded-full backdrop-blur-sm">
              <Zap className="w-4 h-4 text-pink-400" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-gray-800/50 border border-gray-600/50 rounded text-gray-300 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded hover:bg-cyan-500/30 transition-colors text-cyan-400 font-mono text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </motion.a>
          
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-400/50 rounded hover:bg-pink-500/30 transition-colors text-pink-400 font-mono text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            Code
          </motion.a>
        </div>
      </div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}