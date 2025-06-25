import { motion } from 'framer-motion';

import image1 from '../../assets/onboarding/image1.jpg';
// Pea pod image
import image2 from '../../assets/onboarding/image2.jpg';
// Field image
import logo from '../../assets/onboarding/logo.svg';

// Aasha logo

const Onboarding1 = () => {
  return (
    <div className="fixed inset-0 w-full h-full  bg-black overflow-hidden flex flex-col items-center justify-start">
      {/* Ellipse exactly like Figma */}
      <motion.div
        initial={{ y: '-60%' }}
        animate={{ y: 2 }}
        transition={{ type: 'tween', duration: 4, ease: 'easeInOut' }}
        className="
    absolute z-10
    rounded-full
    overflow-hidden
    left-1/2
    -translate-x-1/2
    -top-1/4
    w-[500px] h-[700px]
    sm:w-[600px] sm:h-[600px] sm:-top-40
    md:w-[700px] md:h-[700px] md:-top-48
    lg:w-[788px] lg:h-[788px] lg:-top-[262px]
  "
      >
        <img src={image1} alt="Pea Pods" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-900" style={{ opacity: 0.6 }} />
      </motion.div>
      {/* Aasha Logo and Text */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: 200 }} // right se aayega
        animate={{ opacity: 1, y: 0, x: 0 }} // center pe aayega
        transition={{ delay: 4, duration: 0.8, ease: 'easeInOut' }}
        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-50 flex items-center justify-center gap-2"
      >
        <img src={logo} alt="Aasha Logo" className="w-[48px] h-[48px]" />
        <span className="text-white text-[24px] font-bold drop-shadow-md">Aasha</span>
      </motion.div>

      {/* Bottom Field Image */}
      <div className="w-full flex-1 flex items-end justify-center z-0">
        <img src={image2} alt="Field" className="w-full object-cover" style={{ height: '900px' }} />
      </div>
    </div>
  );
};

export default Onboarding1;
