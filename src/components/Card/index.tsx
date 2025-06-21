import React, { ReactNode } from 'react';

import { Filter } from 'lucide-react';

import farmEnrollImage from '@/assets/home/farm-enrolled.jpg';

import { Button } from '../ui/button';

interface CardProps {
  showMoreButton?: boolean;
  onButtonClick?: () => void;
  className?: string;
  children: ReactNode;
  backgroundImage?: string;
}

const Card: React.FC<CardProps> = ({
  backgroundImage,
  className,
  showMoreButton = true,
  onButtonClick,
  children,
}) => {
  return (
    <div
      className={`
                    bg-white rounded-xl mx-4 mt-6 relative shadow-md  
                    ${backgroundImage ? 'bg-black/40 backdrop-blur-md' : 'bg-white'}
                    ${className}
                    `}
    >
      {children}
      {showMoreButton && (
        <Button
          className="absolute rounded-tl-[1px] rounded-br-[1px] top-0 right-0 text-sm h-7 text-white bg-green-800"
          variant="outline"
          onClick={onButtonClick}
        >
          <p className="font-normal text-xs">More Details</p>
        </Button>
      )}
    </div>
  );
};
export default Card;

export const FarmEnrolledCard = () => {
  return (
    <Card className="relative bg-green-200 rounded-xl mx-4  mt-2 overflow-hidden h-[145px]">
      <div className={`absolute -inset-5 bg-cover bg-center bg-[${farmEnrollImage}]`} />
      <div className="absolute inset-0 bg-green-900/50" />

      <div className="text-white p-4 h-full">
        <h2 className="text-lg font-semibold absolute top-9 left-13">Farm Enrolled</h2>
        <p className="text-sm mt-1 flex items-center absolute top-16 left-13">
          <span className="relative flex items-center justify-center w-3 h-3 mr-2">
            <span className="absolute h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
            <span className="  h-2  w-2 bg-white rounded-full z-10"></span>
          </span>
          1,250 Enrolled
        </p>
        <div className="absolute -bottom-1 -right-2 w-19 h-19 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="bg-green-900 p-3 rounded-full flex w-[53px] h-[53px] items-center justify-center">
            <Filter className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
    </Card>
  );
};

interface FarmerRegisteredCard {
  title: string;
  description: string;
  imageUrl?: string;
}

export const FarmerRegisteredCard: React.FC<FarmerRegisteredCard> = ({ title, description }) => {
  return (
    <Card className="flex justify-between p-4">
      <div className="">
        <h5 className="font-semibold text-base">{title}</h5>
        <p className={` mt-1 text-base font-normal`} style={{ color: '#005B24' }}>
          {description}
        </p>
      </div>
    </Card>
  );
};

export const SoilTestReportCard: React.FC<FarmerRegisteredCard> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card className="flex justify-between">
      <div className="p-4 pr-0">
        <h5 className="font-semibold text-base">{title}</h5>
        <p className={` mt-1 text-base font-normal text-green-700`}>{description}</p>
      </div>

      <div className="relative width-full rounded-xl">
        <img src={imageUrl} alt="Info" className="w-[130px] rounded-xl" />
        <div
          className="absolute top-0 left-0 w-[100%] h-[100%]"
          style={{
            background: 'linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))',
          }}
        />
      </div>
    </Card>
  );
};

type GrainData = {
  name: string;
  contact: string;
  quantity: string;
  crop: string;
};

interface SharedGrainProductionProps {
  title: string;
  totalQuantity: string;
  data: GrainData[];
  onButtonClick: () => void;
}

export const ShareGrainProductionCard: React.FC<SharedGrainProductionProps> = ({
  title,
  totalQuantity,
  data,
}) => {
  return (
    <Card>
      <div className="p-4 pb-0">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-green-700 text-sm">{totalQuantity}</p>
      </div>

      {/* Data List */}
      <div className="p-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-3 px-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.contact}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{item.quantity}</p>
              <p className="text-sm text-gray-500">{item.crop}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

type FertilizerPestisedsCardTypes = {
  name: string;
  value: string;
};

interface FertilizerPestisedsCardProps {
  title: string;
  data: FertilizerPestisedsCardTypes[];
}

export const FertilizerPestisedsCard: React.FC<FertilizerPestisedsCardProps> = ({
  title,
  data,
}) => {
  return (
    <>
      <Card className="p-4">
        <h2
          className="text-sm font-semibold text-black mb-2
                
                "
        >
          {title}
        </h2>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between text-sm border-b last:border-b-0 py-1">
              <span className="text-green-700">{item.name}:</span>
              <span className="text-green-700">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

interface HomeHeroSectionCardProps {
  imageUrl: string;
}

export const HomeHeroSectionCard: React.FC<HomeHeroSectionCardProps> = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-30  overflow-hidden flex items-center bg-white">
      <div className="absolute top-0 right-0 h-full w-3/5">
        <img src={imageUrl} alt="Smart Farming" className="h-50 w-full object-cover" />
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-l  from-transparent via-white/60 to-white" />
      </div>
      <div className="absolute bottom-0 left-0 h-1/7 w-full bg-gradient-to-t from-white/80 to-transparent"></div>
      <div className="relative z-10 px-6 w-70">
        <h1 className=" text-dangerred">Smart</h1>
        <p className="font-normal text-xl">Farming Solutions</p>
      </div>
    </div>
  );
};

interface FarmStepCardProps {
  image: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'remaining';
  showLine: boolean;
}

export const FarmStepCard: React.FC<FarmStepCardProps> = ({
  image,
  title,
  subtitle,
  status,
  showLine,
}) => {
  return (
    <>
      {status === 'completed' && <div className="w-full h-px bg-gray-300 "></div>}
      <div className="relative flex items-start h-33">
        <div className="relative z-10 mt-3 mb-3 h-25">
          <div className={`rounded-full p-[5px]  ${status === 'completed' ? 'bg-green-100' : ''} `}>
            <div
              className={`rounded-full p-[4px]  ${status === 'completed' ? 'bg-green-900' : ''} `}
            >
              <div className={`rounded-full p-[4px]  ${status === 'completed' ? 'bg-white' : ''} `}>
                <img src={image} alt={title} className="w-20 h-20 object-cover rounded-full" />
              </div>
            </div>
          </div>
          {showLine && (
            <div className="absolute bottom-0 left-13 top-full -translate-x-1/2 w-1.5 h-16 bg-gray-300 z-11"></div>
          )}
        </div>

        <div className="ml-4 mt-6">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className=" absolute ml-auto mr-0 -right-6">
          <span
            className={`text-xs ${
              status === 'completed' ? 'bg-green-800' : 'bg-green-800'
            } text-white px-3 py-1 rounded-l-full`}
          >
            {status === 'completed' ? '✓ Completed' : '✗ Remaining'}
          </span>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full " />
    </>
  );
};
