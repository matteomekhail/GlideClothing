import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/Components/ui/card";

interface Technology {
  name: string;
  icon: string;
  description: string;
}

const technologies: Technology[] = [
  { name: "React", icon: "react", description: "A JavaScript library for building user interfaces" },
  { name: "Laravel", icon: "laravel", description: "The PHP Framework for Web Artisans" },
  { name: "Inertia.js", icon: "inertia", description: "The Modern Monolith" },
  { name: "TypeScript", icon: "typescript", description: "JavaScript that scales" },
  { name: "Tailwind CSS", icon: "tailwindcss", description: "Rapidly build modern websites without ever leaving your HTML" },
  { name: "Shadcn/ui", icon: "shadcnui", description: "Beautifully designed components built with Radix UI and Tailwind CSS" },
  { name: "Framer Motion", icon: "framer", description: "Production-ready declarative animations" },
  { name: "Vite", icon: "vite", description: "Next Generation Frontend Tooling" },
];

const TechStack: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Powered by Cutting-Edge Technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TechCard: React.FC<{ tech: Technology; index: number }> = ({ tech, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-card hover:bg-accent h-full">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <motion.div
              className="mb-4 flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={tech.icon === "shadcnui" ? "https://ui.shadcn.com/apple-touch-icon.png" : `https://cdn.simpleicons.org/${tech.icon}`}
                alt={tech.name}
                className="w-16 h-16 group-hover:filter group-hover:brightness-110"
              />
            </motion.div>
            <h3 className="font-semibold text-xl mb-2 text-center group-hover:text-primary transition-colors duration-300">{tech.name}</h3>
          </div>
          <p className="text-sm text-center text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300">{tech.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TechStack;
