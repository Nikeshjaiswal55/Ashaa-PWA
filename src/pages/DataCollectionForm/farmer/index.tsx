import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header/Header';

import farm from '../../../assets/FarmerFarmInfo/farm.png';
import delte from '../../../assets/Icons/delete.svg';

const FarmCard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header hideText hideProfile />
      <div className="flex w-full justify-center ">
        <div className="relative flex items-center h-[88px] mt-10 mx-3 justify-between bg-[rgba(54,195,96,0.1)] rounded-2xl px-4 w-full ">
          {/* DELETE BUTTON */}
          <div className="absolute top-2 left-2">
            <button className="text-red-500 hover:text-red-600">
              <img src={delte} />
            </button>
          </div>

          {/* LEFT: Image */}
          <div className="w-[85px] h-[74px] rounded-md overflow-hidden">
            <img src={farm} alt="farm" className="w-full h-full object-cover" />
          </div>

          {/* CENTER: Farm Info */}
          <div className="flex-1 px-4">
            <div className="text-green-900 font-bold text-lg">Shivam Farm</div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <span>📍Ajnas</span>
              <span>🌾 Gram</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end justify-between h-full">
            <div className="text-gray-500 font-semibold text-md">1 Acre</div>
            <button className="mt-2  text-green-800 p-1 bg-white rounded-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5l3 3L13 14h-3v-3L18.5 2.5z"
                />
              </svg>
            </button>
          </div>

          {/* FULL WIDTH LINE (ABSOLUTE) */}
          <div className="absolute bottom-[40%] left-[110px] mb-1 right-[2px] h-[1px] bg-gray-400"></div>
        </div>
      </div>

      <div className="mb-4 mt-6 max-w-md mx-3">
        <div className="flex items-center justify-between  justify-center border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none">
          <span
            className="font-semibold text-green-900  text-base"
            onClick={() => navigate('/DataCollectionForm/FarmDetails?reset=true')}
          >
            + Add Fertilizer Usage
          </span>
          <span className="text-green-900 text-2xl font-bold"></span>
        </div>
      </div>
    </>
  );
};

export default FarmCard;
