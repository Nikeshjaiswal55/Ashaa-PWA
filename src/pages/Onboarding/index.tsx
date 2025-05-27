import React from 'react';

import { FarmStepCard } from '@/components/Card';
import Header from '@/components/Header/Header';

import farm from '../../assets/FarmerFarmInfo/Farm.jpg';
import farmer from '../../assets/FarmerFarmInfo/Farmer.jpg';
import grains from '../../assets/FarmerFarmInfo/grains.jpg';

const steps = [
  {
    image: farmer,
    title: 'Farmer Details',
    subtitle: 'Fill Farmer info',
    status: 'completed',
  },
  {
    image: farm,
    title: 'Farm Details',
    subtitle: 'Fill Farm info',
    status: 'remaining',
  },
];

const Page2: React.FC = () => {
  return (
    <>
      <div className="h-full bg-white relative">
        <Header hideText hideProfile />

        <div className="text-center mt-10">
          <h2 className="text-green-800 font-semibold text-lg">Farmer & Farm</h2>
          <p className="text-green-800 font-semibold text-lg">Information Step</p>
        </div>

        <div className="mt-10 px-6 pb-32">
          {' '}
          {/* Give bottom padding for space */}
          {steps.map((step, index) => (
            <FarmStepCard
              key={index}
              image={step.image}
              title={step.title}
              subtitle={step.subtitle}
              status={step.status as 'completed' | 'remaining'}
              showLine={index !== steps.length - 1}
            />
          ))}
        </div>

        {/* Fixed bottom image */}
      </div>
      <div className="fixed bottom-0 left-0 w-full z-0 h-auto">
        <div className="  max-h-[400px]">
          <img src={grains} alt="village" className="w-full max-h-[400px]  object-cover" />
        </div>
      </div>
    </>
  );
};

export default Page2;
