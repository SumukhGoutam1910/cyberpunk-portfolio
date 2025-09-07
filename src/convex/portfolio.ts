import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    // Sample portfolio data - in a real app this would come from the database
    return [
      {
        id: "1",
        title: "Neural Network Visualizer",
        description: "Interactive 3D visualization of neural networks with real-time training data",
        technologies: ["React", "Three.js", "TensorFlow.js", "WebGL"],
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
        liveUrl: "https://neural-viz.demo",
        githubUrl: "https://github.com/user/neural-viz",
        featured: true
      },
      {
        id: "2",
        title: "Cyberpunk City Generator",
        description: "Procedural city generation with neon aesthetics and dynamic lighting",
        technologies: ["Unity", "C#", "Blender", "HLSL"],
        category: "Game Dev",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        liveUrl: "https://cyber-city.demo",
        githubUrl: "https://github.com/user/cyber-city",
        featured: true
      },
      {
        id: "3",
        title: "Blockchain Analytics Dashboard",
        description: "Real-time cryptocurrency trading analytics with predictive algorithms",
        technologies: ["Next.js", "D3.js", "Node.js", "MongoDB"],
        category: "Web Dev",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        liveUrl: "https://crypto-dash.demo",
        githubUrl: "https://github.com/user/crypto-dash",
        featured: false
      },
      {
        id: "4",
        title: "AR Hologram Interface",
        description: "Augmented reality interface for data manipulation in 3D space",
        technologies: ["ARCore", "Unity", "C#", "OpenCV"],
        category: "AR/VR",
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop",
        liveUrl: "https://ar-holo.demo",
        githubUrl: "https://github.com/user/ar-holo",
        featured: true
      },
      {
        id: "5",
        title: "Quantum Computing Simulator",
        description: "Web-based quantum circuit simulator with educational visualizations",
        technologies: ["Python", "Qiskit", "React", "WebAssembly"],
        category: "Research",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
        liveUrl: "https://quantum-sim.demo",
        githubUrl: "https://github.com/user/quantum-sim",
        featured: false
      },
      {
        id: "6",
        title: "Biometric Security System",
        description: "Multi-modal biometric authentication using facial and voice recognition",
        technologies: ["Python", "OpenCV", "TensorFlow", "FastAPI"],
        category: "Security",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        liveUrl: "https://bio-sec.demo",
        githubUrl: "https://github.com/user/bio-sec",
        featured: false
      }
    ];
  },
});

export const getSkills = query({
  args: {},
  handler: async (ctx) => {
    return {
      frontend: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js/WebGL", level: 85 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Framer Motion", level: 88 }
      ],
      backend: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 88 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "GraphQL", level: 80 }
      ],
      tools: [
        { name: "Docker", level: 85 },
        { name: "AWS/GCP", level: 80 },
        { name: "Git/GitHub", level: 95 },
        { name: "Figma", level: 75 },
        { name: "Blender", level: 70 }
      ],
      ai: [
        { name: "TensorFlow", level: 85 },
        { name: "PyTorch", level: 80 },
        { name: "OpenCV", level: 82 },
        { name: "Hugging Face", level: 78 },
        { name: "LangChain", level: 75 }
      ]
    };
  },
});
