import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { GlitchText } from '@/components/GlitchText';
import { Navigation } from '@/components/Navigation';
import { ProjectCard3D } from '@/components/ProjectCard3D';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/convex/_generated/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Rocket, 
  Terminal, 
  Twitter,
  Zap,
  Quote,
  Instagram
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { toast } from 'sonner';

export default function Landing() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const projects = useQuery(api.portfolio.getProjects) || [];
  const skills = useQuery(api.portfolio.getSkills);

  // Add: Testimonials data
  const testimonials = [
    {
      name: 'Sarah Lee',
      role: 'Product Designer @ NeonLabs',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      quote:
        'Working with Alex felt like collaborating with a creative engine. The attention to detail and performance was next-level.'
    },
    {
      name: 'Marcus Wright',
      role: 'CTO @ HyperGrid',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
      quote:
        'He delivered an immersive 3D experience that ran buttery-smooth on all devices. Truly impressive engineering.'
    },
    {
      name: 'Ava Johnson',
      role: 'Founder @ Synthwave Studio',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face',
      quote:
        'The cyberpunk aesthetic was executed perfectly—glitch, neon, and depth without sacrificing usability.'
    },
    {
      name: 'Kenji Nakamura',
      role: 'Lead Dev @ QuantumMesh',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
      quote:
        'Clean architecture, thoughtful animations, and a delightful UX. Would collaborate again in a heartbeat.'
    },
  ];

  // Add: skill logos to showcase beneath the skills containers
  const skillLogos = [
    // Frontend
    { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', dark: true },
    // Update: TailwindCSS via SimpleIcons for reliability
    { name: 'TailwindCSS', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', dark: true },
    { name: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },

    // Backend
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', dark: true },
    { name: 'Flask', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', dark: true },
    { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },

    // Tools
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    // Replace Linux with Kali Linux (SimpleIcons)
    { name: 'Kali Linux', url: 'https://cdn.simpleicons.org/kalilinux/557C94' },
    { name: 'RedHat', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg' },
    // Use provided AWS SVG inline to ensure correct rendering
    {
      name: 'AWS (Cloud)',
      inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 300.7 179.8" width="40" height="40"><style>.st0{fill:#252f3e}.st1{fill:#f90}</style><path class="st0" d="M84.7 65.3c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8s7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5s1.4-1.4 2.8-2.1c3.5-1.8 7.7-3.3 12.6-4.5C39.3.8 44.5.2 50 .2c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM44.1 80.5c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4s1-5.3 1-8.7V53c-2.9-.7-6-1.3-9.2-1.7s-6.3-.6-9.4-.6c-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L95 9.1c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9L129 73.7l15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9s-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1s-1.5-2-1.9-4l-15.5-64.5-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zM252.9 94c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1s4.2-6 7.2-8.2c3-2.3 6.4-4 10.4-5.2S251.8 0 256.2 0c2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8s-4.7 4.8-4.7 8.9c0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6s4.6 8.8 4.6 14c0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"/><path class="st1" d="M271.8 142.6c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"/><path class="st1" d="M285.5 127c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"/></svg>`
    },
    { name: 'GitHub Actions (DevOps)', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },

    // Programming Languages
    { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Dart', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  ];

  // Filter projects by category
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Add: 'testimonials' to observed sections
    const sections = ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden pt-16">
      <CyberpunkBackground />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <motion.div 
          className="text-center z-10 px-4"
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                <Terminal className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <GlitchText className="text-5xl md:text-7xl font-bold mb-4">
              SUMUKH GOUTAM
            </GlitchText>
            <motion.div
              className="text-2xl md:text-3xl text-cyan-400 mb-6"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(0, 255, 255, 0.5)',
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                  '0 0 10px rgba(0, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ELECTRONICS & COMPUTER ENGINEERING STUDENT
            </motion.div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Self‑driven and skilled ECE/CSE student with interests in Cybersecurity,
              Embedded Systems, and modern Web Development. Always learning and
              building with openness and independence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black font-bold px-8 py-3 rounded-lg border-0"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="w-5 h-5 mr-2" />
              View Projects
            </Button>
            <Button
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 px-8 py-3 rounded-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [0, Math.random() * window.innerWidth],
                y: [window.innerHeight, -100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: Math.random() * window.innerWidth,
                top: window.innerHeight
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText>ABOUT_ME.EXE</GlitchText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2" />
                  Electronics & Computer Engineering Student
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a motivated engineering student pursuing ECE with a strong
                  passion for Cybersecurity, Embedded Systems, and Web Development.
                  I enjoy working hands‑on, exploring new technologies, and
                  collaborating to build practical solutions.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Beyond academics, I love learning about nuclear tech,
                  reading (novels, human‑psych), and continually sharpening my
                  problem‑solving mindset.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 border border-pink-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-pink-400">5+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">5+</div>
                  <div className="text-sm text-gray-400">Months Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <motion.div
                  className="w-full h-96 bg-gradient-to-br from-cyan-500/20 via-pink-500/20 to-purple-500/20 rounded-lg border border-cyan-400/50"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                      '0 0 40px rgba(255, 0, 128, 0.3)',
                      '0 0 20px rgba(0, 255, 255, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img
                    src="https://harmless-tapir-303.convex.cloud/api/storage/347f897e-a564-43c4-92ee-e7295abe9b9e"
                    alt="Sumukh Goutam"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 rounded-lg pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText>PROJECTS.DIR</GlitchText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8" />
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-mono text-sm border transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                      : 'bg-black/40 border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard3D key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section (Cyberpunk progress bars) */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText>SKILLS.JSON</GlitchText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto" />
          </motion.div>

          {skills && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card helper as inline fragment to avoid new files */}
              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-black/60 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                <h3 className="text-2xl font-bold text-cyan-400 mb-2 font-mono">Frontend</h3>
                <div className="w-12 h-1 bg-cyan-400/60 rounded mb-6" />
                <div className="space-y-5 relative z-10">
                  {skills.frontend.map((s, i) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-200">{s.name}</span>
                        <span className="text-cyan-300 font-mono">{s.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800/60 border border-cyan-500/20 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#22d3ee]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/60 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
                <h3 className="text-2xl font-bold text-pink-400 mb-2 font-mono">Backend</h3>
                <div className="w-12 h-1 bg-pink-400/60 rounded mb-6" />
                <div className="space-y-5 relative z-10">
                  {skills.backend.map((s, i) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-200">{s.name}</span>
                        <span className="text-pink-300 font-mono">{s.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800/60 border border-pink-500/20 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-500 shadow-[0_0_12px_#f472b6]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/60 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
                <h3 className="text-2xl font-bold text-emerald-400 mb-2 font-mono">Tools</h3>
                <div className="w-12 h-1 bg-emerald-400/60 rounded mb-6" />
                <div className="space-y-5 relative z-10">
                  {skills.tools.map((s, i) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-200">{s.name}</span>
                        <span className="text-emerald-300 font-mono">{s.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800/60 border border-green-500/20 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 shadow-[0_0_12px_#34d399]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Programming Languages (New) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/60 border border-violet-500/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 pointer-events-none" />
                <h3 className="text-2xl font-bold text-violet-400 mb-2 font-mono">Programming Languages</h3>
                <div className="w-12 h-1 bg-violet-400/60 rounded mb-6" />
                <div className="space-y-5 relative z-10">
                  {skills.programmingLanguages?.map((s, i) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-200">{s.name}</span>
                        <span className="text-violet-300 font-mono">{s.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800/60 border border-violet-500/20 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 shadow-[0_0_12px_#a78bfa]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Logos Cloud beneath the skill containers */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold font-mono text-white">
                <span className="text-cyan-400">TECH</span> LOGOS
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mt-3" />
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {skillLogos.map((logo, i) => (
                <motion.div
                  key={logo.name + i}
                  className="group relative rounded-xl border border-cyan-500/20 bg-black/40 p-4 overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  initial={false}
                  style={{ rotate: (i % 4 === 0 ? -2 : i % 4 === 1 ? 1.5 : i % 4 === 2 ? -1 : 2) + 'deg' }}
                >
                  {/* Hover-only gradient for the single tile */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.18),transparent_60%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-gradient-to-br from-cyan-500/15 via-transparent to-pink-500/15" />

                  {/* Logo: support inline SVG fallback specifically for AWS */}
                  {'inlineSvg' in logo && (logo as any).inlineSvg ? (
                    <div
                      className="relative z-10 mx-auto h-10 w-10"
                      aria-label={logo.name}
                      dangerouslySetInnerHTML={{ __html: (logo as any).inlineSvg }}
                    />
                  ) : (
                    <img
                      src={(logo as any).url}
                      alt={logo.name}
                      className={`relative z-10 mx-auto h-10 w-10 object-contain ${ (logo as any).dark ? 'invert' : '' }`}
                      title={logo.name}
                    />
                  )}

                  <div className="relative z-10 mt-2 text-center text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-cyan-300 transition-colors">
                    {logo.name}
                  </div>

                  {/* neon border glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText>TESTIMONIALS.LOG</GlitchText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto" />
          </motion.div>

          {/* Marquee Rows */}
          <div className="space-y-10">
            {/* Row 1 */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6 will-change-transform"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <motion.div
                    key={`row1-${i}-${t.name}`}
                    className="group min-w-[260px] sm:min-w-[320px] max-w-[260px] sm:max-w-[320px] bg-black/70 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-md"
                    whileHover={{ rotateY: 6, rotateX: 2, z: 40, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-lg object-cover border border-cyan-500/40"
                      />
                      <div>
                        <div className="text-white font-mono font-bold leading-tight">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.role}</div>
                      </div>
                      <div className="ml-auto p-2 bg-cyan-500/15 border border-cyan-400/40 rounded-lg">
                        <Quote className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                    <div className="mt-3 text-[10px] uppercase tracking-widest text-cyan-400/70">
                      Verified Feedback
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Row 2 (reverse direction, slower) */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6 will-change-transform"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <motion.div
                    key={`row2-${i}-${t.name}`}
                    className="group min-w-[260px] sm:min-w-[320px] max-w-[260px] sm:max-w-[320px] bg-black/70 border border-pink-500/30 rounded-xl p-6 backdrop-blur-md"
                    whileHover={{ rotateY: -6, rotateX: 2, z: 40, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-lg object-cover border border-pink-500/40"
                      />
                      <div>
                        <div className="text-white font-mono font-bold leading-tight">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.role}</div>
                      </div>
                      <div className="ml-auto p-2 bg-pink-500/15 border border-pink-400/40 rounded-lg">
                        <Quote className="w-4 h-4 text-pink-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                    <div className="mt-3 text-[10px] uppercase tracking-widest text-pink-400/70">
                      Verified Feedback
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-pink-500/5 via-transparent to-cyan-500/5" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText>CONTACT.SYS</GlitchText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8" />
            <p className="text-xl text-gray-300">
              Ready to build something amazing together?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">sumukhgoutam0804@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300">+91 9860934944</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Pune, Maharashtra 411015, India</span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <motion.a
                    href="https://github.com/SumukhGoutam1910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:border-cyan-400/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-cyan-400 group-hover:scale-110 group-hover:rotate-3" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/sumukh-goutam-4ab13529b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:border-cyan-400/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-cyan-400 group-hover:scale-110 group-hover:rotate-3" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/sumukh_0804/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:border-cyan-400/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-cyan-400 group-hover:scale-110 group-hover:rotate-3" />
                  </motion.a>
                </div>

                <motion.a
                  href="https://drive.google.com/file/d/1xupF_5jJIMEe4ZLYDjs6-FQcCEnmoxcl/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleContactSubmit} className="bg-black/60 border border-pink-500/30 rounded-lg p-8 backdrop-blur-sm space-y-6">
                <h3 className="text-2xl font-bold text-pink-400 mb-6">Send Message</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      required
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    required
                    className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    required
                    rows={5}
                    className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold rounded-lg hover:from-pink-600 hover:to-cyan-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-500/30 bg-black/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-mono">
            © 2025 Sumukh Goutam. Crafted with{' '}
            <span className="text-pink-400">♥</span>{' '}
            in the digital realm.
          </p>
        </div>
      </footer>
    </div>
  );
}