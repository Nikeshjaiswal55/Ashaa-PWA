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
    className={`flex items-center w-full justify-between shadow-md px-3 py-1 h-[39px] rounded-md w-fit  ${className}`}
  >
    <label className="text-lg font-semibold text-green-900 mr-3">{label}</label>
    <div className="flex border border-gray-300 rounded-sm overflow-hidden">
      <button
        type="button"
        className={`text-sm font-medium px-4 py-1 rounded-sm ${
          value ? 'bg-green-700 text-white' : 'bg-white text-gray-500'
        }`}
        onClick={() => onChange(true)}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        className={`text-sm font-medium px-4 py-1 rounded-r-full ${
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
