// import React from 'react';

// import { Home, Leaf, List, MapPin, Plus } from 'lucide-react';

// const Footer: React.FC = () => {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50">
//       <div className="relative h-20 bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)] border-t border-green-200">
//         {/* Curved SVG Top Edge */}
//         <svg
//           className="absolute top-0 left-0 w-full h-20"
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//         >
//           <path d="M0,0 L0,100 Q50,60 100,100 L100,0 Z" fill="white" />
//         </svg>

//         {/* Floating Plus Button */}
//         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
//           <button className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
//             <Plus size={28} className="text-white" />
//           </button>
//         </div>

//         {/* Footer Icons */}
//         <div className="flex justify-around items-center h-full z-20 relative">
//           <button className="text-green-700">
//             <Home size={24} />
//           </button>
//           <button className="text-green-700">
//             <Leaf size={24} />
//           </button>
//           <div className="w-16"></div> {/* Spacer for center button */}
//           <button className="text-green-700">
//             <MapPin size={24} />
//           </button>
//           <button className="text-green-700">
//             <List size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from 'react';
import { Home, MapPin, List, Leaf, Plus } from 'lucide-react';
import backImage from '@/assets/header/Subtract.svg';
import gradient from '@/assets/header/Rectangle 27.png';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 rounded-t-xl shadow-md">
      <img src={backImage} className='absolute bottom-1' style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.25);" }} />
      <img src={gradient} className='absolute bottom-0 opacity-70' style={{ zIndex: -1 }} />
      <div className="relative flex justify-around items-center h-16">
        {/* <div className="flex justify-around items-center w-full "> */}
        <div className="grid grid-cols-2 w-full">
          <div className='flex items-center justify-around mr-5'>
            <Home className="h-6 w-6 text-green-700" />
            <Leaf className="h-6 w-6 text-green-700" />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button className="bg-green-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl border-2 border-white">
              <Plus size={32} />
            </button>
          </div>

          <div className='flex items-center justify-around ml-5'>
            <MapPin className="h-6 w-6 text-green-700" />
            <List className="h-6 w-6 text-green-700" />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>)
};

export default Footer;



