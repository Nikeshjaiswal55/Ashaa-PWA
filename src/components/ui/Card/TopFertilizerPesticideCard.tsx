import React from 'react';

type Item = {
  name: string;
  value: string;
};

type TopListCardProps = {
  title: string;
  data: Item[];
};

const TopFertilizerPesticideCard: React.FC<TopListCardProps> = ({ title, data }) => {
  return (
    <div
      className="bg-white  rounded-xl mt-5   p-4 mx-4 border border-green-100"
      style={{
        boxShadow: '0px 4px 39.7px rgba(0, 0, 0, 0.25)',
      }}
    >
      <h2 className="text-sm font-semibold text-black mb-2">{title}</h2>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between text-sm border-b last:border-b-0 py-1">
            <span className="text-green-700">{item.name}:</span>
            <span className="text-green-700">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFertilizerPesticideCard;
