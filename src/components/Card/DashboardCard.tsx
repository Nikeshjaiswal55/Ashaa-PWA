import React from 'react';

import { Button } from '@/components/ui/button';

// Adjust path as needed

interface InfoCardProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  imageUrl?: string;
  showImage?: boolean;
}

const DashboardCard: React.FC<InfoCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  imageUrl,
  showImage = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl mx-4 mt-6 p-4 relative flex ${
        showImage ? 'items-center justify-between pl-4 pr-0' : ''
      }`}
      style={{
        boxShadow: '0px 4px 39.7px rgba(0, 0, 0, 0.25)',
        height: '81px',
      }}
    >
      <div>
        <h5 className="font-semibold text-base">{title}</h5>
        <p
          className={` mt-1 text-base font-normal  ${showImage ? 'text-green-700' : ''}`}
          style={{ color: '#005B24' }}
        >
          {description}
        </p>
      </div>

      {showImage && imageUrl ? (
        <div
          style={{
            position: 'relative',
            height: '81px',
            width: '130px',
            borderRadius: '5%',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt="Info"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
          {/* Left to right white gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              height: '100%',
              width: '100%',
              background: 'linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))',
            }}
          ></div>
        </div>
      ) : buttonText ? (
        <Button
          className="absolute top-0 right-0 text-sm h-7   text-white"
          style={{
            backgroundColor: '#005B24',
            borderTopRightRadius: '0px',
            borderTopLeftRadius: '0px',
          }}
          variant="outline"
          onClick={onButtonClick}
        >
          <p className="font-normal text-xs">{buttonText} </p>
        </Button>
      ) : null}
    </div>
  );
};

export default DashboardCard;
