import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  isVisible: boolean;
}

export default function HeroContent({ isVisible }: HeroContentProps) {
  return (
    <div className="relative min-h-screen">
      {/* Immagini di sfondo */}
      <div className="absolute inset-0 grid grid-cols-2 w-full h-full">
        <div className="relative">
          <img
            src="/img/Lifestyle/Lifestyle-BluePink-1.jpg"
            alt="Background 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Overlay scuro */}
        </div>
        <div className="relative">
          <img
            src="/img/Lifestyle/Lifestyle-Blue-3.jpg"
            alt="Background 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Overlay scuro */}
        </div>
      </div>

      {/* Contenuto centrale */}
      <div className={`relative z-10 flex items-center justify-center min-h-screen transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center space-y-8 max-w-3xl px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
            Carry your style with confidence
          </h2>
          
          <p className="text-base sm:text-lg text-white/90 max-w-md lg:max-w-lg mx-auto font-semibold">
            Discover our premium quilted bags designed for the modern urban lifestyle. 
            Minimalist aesthetics meet maximum functionality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center sm:justify-start gap-2 hover:bg-white/90 transition-colors">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium border border-white text-white hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}