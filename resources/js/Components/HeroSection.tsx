import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Card } from "@/Components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const getTitleGradient = () => {
    return theme === 'dark'
      ? 'from-primary via-gray-400 to-secondary'
      : 'from-primary via-black to-secondary';
  };

  const getButtonGradient = () => {
    return theme === 'dark'
      ? 'from-primary to-gray-400'
      : 'from-primary to-black';
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background min-h-screen w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.07]" />
        <motion.div
          className="absolute top-0 left-0 w-2/3 h-2/3 bg-primary/10 dark:bg-primary/5 rounded-full -translate-x-1/4 -translate-y-1/4 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full bg-secondary/10 dark:bg-secondary/5 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-screen flex flex-col justify-center">
        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-12" variants={containerVariants}>
          {/* Left side: Content */}
          <motion.div className="lg:w-1/2 space-y-6" variants={itemVariants}>
            <motion.h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${getTitleGradient()}`}
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              ShadowStack
            </motion.h1>
            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" variants={itemVariants}>
              Turbocharge Your Web Development
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-muted-foreground" variants={itemVariants}>
              Launch your next project in record time with our premium React-Laravel-Inertia boilerplate, enhanced with shadcn/ui and Stripe integration.
            </motion.p>
            <motion.div className="flex flex-wrap gap-2 sm:gap-4" variants={containerVariants}>
              <AnimatedBadge>React</AnimatedBadge>
              <AnimatedBadge>Laravel</AnimatedBadge>
              <AnimatedBadge>Inertia.js</AnimatedBadge>
              <AnimatedBadge>shadcn/ui</AnimatedBadge>
              <AnimatedBadge>Stripe</AnimatedBadge>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className={`bg-gradient-to-r ${getButtonGradient()} text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side: Feature highlights */}
          <motion.div className="lg:w-1/2 space-y-6 sm:space-y-8" variants={containerVariants}>
            <FeatureCard
              icon="🚀"
              title="Rapid Development"
              description="Hit the ground running with our pre-configured stack, saving weeks of setup time."
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful UI"
              description="Craft stunning interfaces effortlessly with shadcn/ui Components and pre-built templates."
            />
            <FeatureCard
              icon="💳"
              title="Stripe Integration"
              description="Accept payments out of the box with Stripe, fully integrated and ready for your business needs."
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="group flex items-start space-x-4 p-4 sm:p-6 bg-card/50 hover:bg-accent/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </div>
    </Card>
  </motion.div>
);

const AnimatedBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
    transition={{ duration: 0.3 }}
  >
    <Badge
      variant="outline"
      className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      {children}
    </Badge>
  </motion.div>
);

export default HeroSection;
