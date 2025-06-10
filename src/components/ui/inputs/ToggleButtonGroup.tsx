import React from 'react';

interface ToggleButtonGroupProps {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  className?: string;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  label,
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  className = '',
}) => (
  <div
    className={`flex items-center w-full justify-between  px-1 py-1 h-[54px] rounded-md w-fit  ${className}`}
  >
    <label className="text-lg font-semibold text-green-900 pl-2 mr-0">{label}</label>
    <div className="flex border border-gray-300 w-[100px] rounded-[10px] overflow-hidden">
      <button
        type="button"
        className={`text-sm font-medium px-4 h-[30px] py-1 rounded-l-md ${
          value ? 'bg-[#36C360] border-r-black border-1 text-white' : 'bg-white text-gray-500'
        }`}
        onClick={() => onChange(true)}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        className={`text-sm font-medium px-4 h-[30px] py-1 rounded-r-md ${
          !value ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-500'
        }`}
        onClick={() => onChange(false)}
      >
        {noLabel}
      </button>
    </div>
  </div>
);

export default ToggleButtonGroup;
