import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/Components/ui/card";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { title: "Install ShadowStack", description: "Clone the repository to your project directory" },
  { title: "Configure Your Project", description: "Update your configuration files with the provided settings." },
  { title: "Create Your First Component", description: "Start using Shadcn/ui component to build your pages, all already installed!" },
  { title: "Run Your Application", description: "Start your development server and see ShadowStack in action!" },
];

const GettingStarted: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Getting Started with ShadowStack</h2>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="mb-6">
                <CardContent className="flex items-start p-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GettingStarted;
