import React from 'react';

import { Home, Leaf, List, MapPin, Plus } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative h-20 bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)] border-t border-green-200">
        {/* Curved SVG Top Edge */}
        <svg
          className="absolute top-0 left-0 w-full h-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L0,100 Q50,60 100,100 L100,0 Z" fill="white" />
        </svg>

        {/* Floating Plus Button */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <button className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <Plus size={28} className="text-white" />
          </button>
        </div>

        {/* Footer Icons */}
        <div className="flex justify-around items-center h-full z-20 relative">
          <button className="text-green-700">
            <Home size={24} />
          </button>
          <button className="text-green-700">
            <Leaf size={24} />
          </button>
          <div className="w-16"></div> {/* Spacer for center button */}
          <button className="text-green-700">
            <MapPin size={24} />
          </button>
          <button className="text-green-700">
            <List size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
