import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function CTASection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src="/img/Lifestyle/Lifestyle-All.jpg"
              alt="Glide lifestyle"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-2xl">
                Join Our Community of Style Enthusiasts
              </h2>
              
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                Get early access to new collections and exclusive offers
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Button 
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
