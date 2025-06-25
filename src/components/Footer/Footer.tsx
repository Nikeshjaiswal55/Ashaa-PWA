import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Home, Leaf, List, MapPin, Plus } from 'lucide-react';

import gradient from '@/assets/header/Rectangle 27.png';
import backImage from '@/assets/header/Subtract.svg';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 rounded-t-xl shadow-md">
      <img
        src={backImage}
        className="absolute bottom-1"
        style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.25);' }}
      />
      <img src={gradient} className="absolute bottom-0 opacity-70" style={{ zIndex: -1 }} />
      <div className="relative flex justify-around items-center h-16">
        {/* <div className="flex justify-around items-center w-full "> */}
        <div className="grid grid-cols-2 w-full">
          <div className="flex items-center justify-around mr-5">
            <Home className="h-6 w-6 text-green-700" />
            <Leaf className="h-6 w-6 text-green-700" />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              className="bg-green-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl border-2 border-white"
              onClick={() => navigate('/onboarding')}
            >
              <Plus size={32} />
            </button>
          </div>

          <div className="flex items-center justify-around ml-5">
            <MapPin className="h-6 w-6 text-green-700" />
            <List className="h-6 w-6 text-green-700" />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
