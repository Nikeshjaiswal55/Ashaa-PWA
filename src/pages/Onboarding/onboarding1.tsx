import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import image1 from '../../assets/onboarding/image1.jpg';
import image2 from '../../assets/onboarding/image2.jpg';
import logo from '../../assets/onboarding/logo.svg';

const Onboarding1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Total animation: ellipse (4s) + logo (0.8s) + 1s wait = 5.8s
    const timeout = setTimeout(() => {
      navigate('/onboarding/farmer-farm/progress');
    }, 5800);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden flex flex-col items-center justify-start">
      {/* Ellipse */}
      <motion.div
        initial={{ y: '-35%' }}
        animate={{ y: 2 }}
        transition={{ type: 'tween', duration: 4, ease: 'easeInOut' }}
        className="absolute z-10 rounded-full overflow-hidden left-1/2 -translate-x-1/2 -top-1/4 w-[500px] h-[750px] sm:w-[600px] sm:h-[800px] sm:-top-40 md:w-[700px] md:h-[700px] md:-top-48 lg:w-[788px] lg:h-[788px] lg:-top-[262px]"
      >
        <img src={image1} alt="Pea Pods" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-900" style={{ opacity: 0.8 }} />
      </motion.div>
      {/* Aasha Logo and Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
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
