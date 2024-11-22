import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  isVisible: boolean;
}

export default function HeroContent({ isVisible }: HeroContentProps) {
  return (
    <div className="relative">
      <div className={`grid md:grid-cols-2 gap-8 mt-40 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Colonna del contenuto */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Carry your style with confidence
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-md lg:max-w-lg">
            Discover our premium quilted bags designed for the modern urban lifestyle. 
            Minimalist aesthetics meet maximum functionality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center sm:justify-start gap-2 hover:bg-black/90 transition-colors">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium border border-black/10 hover:bg-black/5 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Colonna delle immagini */}
        <div className="relative h-[600px] hidden md:block">
          <img
            src="/img/LifeStyle/box1.jpg"
            alt="Premium bag showcase"
            className="absolute top-0 right-0 w-[400px] h-[400px] object-cover rounded-lg"
          />
          <img
            src="/img/LifeStyle/Box2.jpg"
            alt="Lifestyle bag showcase"
            className="absolute bottom-0 left-0 w-[300px] h-[300px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}