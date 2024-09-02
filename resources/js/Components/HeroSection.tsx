import React from 'react';
import { Button } from "@/Components/ui/button";

interface HeroSectionProps {
  videoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ videoSrc }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video di sfondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenuto */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-16 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          THIS MONTH'S NEW<br />DROPS
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Go grab what you like then we'll meet you at the gym (duh)
        </p>
        <div className="flex space-x-4">
          <Button variant="default" size="lg" className="bg-white text-black hover:bg-gray-200">
            SHOP WOMEN
          </Button>
          <Button variant="outline" size="lg" className="text-black bg-gray-100 hover:bg-gray-200">
            SHOP MEN
          </Button>
          <Button variant="outline" size="lg" className="text-black bg-gray-100 hover:bg-gray-200">
            SHOP COLLECTIONS
          </Button>
        </div>
      </div>

      {/* Pulsante di pausa */}
      <button className="absolute bottom-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection;
