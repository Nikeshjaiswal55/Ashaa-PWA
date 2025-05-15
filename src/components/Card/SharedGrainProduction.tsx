import React from 'react';

type GrainData = {
  name: string;
  contact: string;
  quantity: string;
  crop: string;
};

type SharedGrainProductionProps = {
  title: string;
  totalQuantity: string;
  data: GrainData[];
  buttonText: string;
  onButtonClick: () => void;
};

const SharedGrainProduction: React.FC<SharedGrainProductionProps> = ({
  title,
  totalQuantity,
  data,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-xl mx-4 mt-6 p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-green-700 text-sm">{totalQuantity}</p>
        </div>
        <button
          className="text-sm bg-green-600 text-white px-4 py-2 rounded"
          style={{ backgroundColor: '#005B24' }}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>

      {/* Data List */}
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
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
    </div>
  );
};

export default SharedGrainProduction;
