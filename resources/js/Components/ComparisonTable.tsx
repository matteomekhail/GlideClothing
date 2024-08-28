import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { CheckIcon, XIcon, MinusIcon } from 'lucide-react';

interface Feature {
  name: string;
  shadowStack: boolean | string;
  traditionalLAMP: boolean | string;
  modernJAMStack: boolean | string;
}

const features: Feature[] = [
  { name: "React Frontend", shadowStack: true, traditionalLAMP: false, modernJAMStack: true },
  { name: "Laravel Backend", shadowStack: true, traditionalLAMP: true, modernJAMStack: false },
  { name: "Inertia.js Integration", shadowStack: true, traditionalLAMP: false, modernJAMStack: false },
  { name: "shadcn/ui Components", shadowStack: true, traditionalLAMP: false, modernJAMStack: "Varies" },
  { name: "Stripe Integration", shadowStack: true, traditionalLAMP: "Manual", modernJAMStack: "Varies" },
  { name: "TypeScript Support", shadowStack: true, traditionalLAMP: false, modernJAMStack: true },
  { name: "Pre-configured Auth", shadowStack: true, traditionalLAMP: "Manual", modernJAMStack: "Varies" },
  { name: "API Development Tools", shadowStack: true, traditionalLAMP: "Manual", modernJAMStack: "Varies" },
  { name: "One-Command Setup", shadowStack: true, traditionalLAMP: false, modernJAMStack: "Varies" },
  { name: "Built-in SEO Optimization", shadowStack: true, traditionalLAMP: "Manual", modernJAMStack: true },
];

const ComparisonTable: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">How ShadowStack Compares</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ComparisonCard title="ShadowStack" features={features} index={0} />
        <ComparisonCard title="Traditional LAMP Stack" features={features} index={1} />
        <ComparisonCard title="Modern JAMStack" features={features} index={2} />
      </div>
    </motion.div>
  );
};

const ComparisonCard: React.FC<{ title: string; features: Feature[]; index: number }> = ({ title, features, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{feature.name}</span>
                <FeatureIcon
                  feature={
                    index === 0 ? feature.shadowStack :
                    index === 1 ? feature.traditionalLAMP :
                    feature.modernJAMStack
                  }
                />
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeatureIcon: React.FC<{ feature: boolean | string }> = ({ feature }) => {
  if (typeof feature === 'string') {
    return <Badge variant="outline" className="text-yellow-500 border-yellow-500">{feature}</Badge>;
  }

  return feature ? (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <CheckIcon className="w-5 h-5 text-green-500" />
    </motion.div>
  ) : (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <XIcon className="w-5 h-5 text-red-500" />
    </motion.div>
  );
};

export default ComparisonTable;
