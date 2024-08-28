import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Zap, Shield, Palette, Rocket, Code, GitBranch } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  { title: "Lightning Fast", description: "Optimized performance for quick load times", icon: Zap },
  { title: "Customizable UI", description: "Easily theme and style your components", icon: Palette },
  { title: "Scalable Architecture", description: "Designed to grow with your project", icon: Rocket },
  { title: "Version Control Ready", description: "Seamless integration with Git workflows", icon: GitBranch },
];

const FeaturesShowcase: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose ShadowStack?</h2>
        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const FeatureItem: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="flex-1 flex justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
          <feature.icon className="w-16 h-16 text-primary" />
        </div>
      </motion.div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export default FeaturesShowcase;
