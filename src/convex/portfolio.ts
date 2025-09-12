import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    // Updated portfolio data to match resume
    return [
      {
        id: "kmap-1",
        title: "KmapSolver",
        description:
          "Web-based Karnaugh Map solver with minimized boolean expression output, variable grouping, and fast visualization.",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
        category: "Web Dev",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
        liveUrl: "https://www.kmapsolver.com",
        githubUrl: "https://www.kmapsolver.com",
        featured: true,
      },
      {
        id: "bio-2",
        title: "Smart Biometric Attendance System",
        description:
          "Face-recognition based attendance with LCD classroom display and admin dashboard for analytics.",
        technologies: ["Python", "OpenCV", "Flask", "REST API", "MongoDB"],
        category: "Embedded",
        image:
          "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        id: "ece-3",
        title: "ECE Website",
        description:
          "Department website built with React and Tailwind; coordinated team execution and content management.",
        technologies: ["React", "TypeScript", "Tailwind", "Vite"],
        category: "Web Dev",
        image:
          "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&h=600&fit=crop",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: "solar-4",
        title: "Solar Power Bank",
        description:
          "Hardware project using battery protection, TP4056, boost converter, and 18650 cells to deliver stable power.",
        technologies: ["Hardware", "PCB", "Battery Mgmt"],
        category: "Hardware",
        image:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: "stock-5",
        title: "Stock Price Prediction",
        description:
          "Neural network model for predicting stock trends; learned teamwork and project coordination.",
        technologies: ["Python", "TensorFlow", "Data Science"],
        category: "AI/ML",
        image:
          "https://images.unsplash.com/photo-1643195357171-6aa3bf3e54e8?w=800&h=600&fit=crop",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: "can-6",
        title: "CAN Adapter Testing Framework",
        description:
          "Planned and built a roadmap to integrate RP1210A standards and test CAN connections for automotive modules.",
        technologies: ["Embedded", "C/C++", "Linux"],
        category: "Embedded",
        image:
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
    ];
  },
});

export const getSkills = query({
  args: {},
  handler: async (ctx) => {
    // Updated to align with requested changes
    return {
      frontend: [
        { name: "HTML/CSS", level: 90 },
        { name: "React", level: 85 },
        { name: "Next.js", level: 70 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 },
        // Moved from backend
        { name: "Django (Learning)", level: 40 },
        // Added as requested
        { name: "Flutter", level: 50 },
      ],
      backend: [
        { name: "Node.js/Express", level: 80 },
        { name: "REST APIs", level: 80 },
        { name: "Flask", level: 70 },
        { name: "PostgreSQL/MongoDB", level: 68 },
        // Removed Django from backend
      ],
      tools: [
        { name: "Git/GitHub", level: 90 },
        { name: "Kali Linux/Wireshark", level: 75 },
        { name: "RedHat & VMs", level: 70 },
        // Removed Vercel and Railway
        { name: "Cloud Computing", level: 10 },
        { name: "DevOps", level: 5 },
      ],
      ai: [
        { name: "Computer Vision (OpenCV)", level: 70 },
        { name: "ML Basics", level: 60 },
        { name: "Data Science", level: 55 },
        { name: "TensorFlow (Learning)", level: 45 },
        { name: "Deep Learning Basics", level: 50 },
      ],
    };
  },
});