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
    className={`flex items-center justify-between w-full h-[52px]  bg-[#D6F5DD] rounded-[10px] px-3 py-2 ${className}`}
  >
    <span className="font-semibold text-[#17643A] text-base whitespace-nowrap">{label}</span>
    <div className="flex rounded-[6px] overflow-hidden ml-2 w-[101px] h-[28px]">
      <button
        type="button"
        className={`flex-1 text-xs font-medium  h-full transition-colors duration-150 ${
          value ? 'bg-[#36C360] text-white' : 'bg-[#E0E0E0] text-[#A0A0A0]'
        }`}
        style={{
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          borderRight: '2px solid #222',
        }}
        onClick={() => onChange(true)}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        className={`flex-1 text-xs font-medium border-[1px]  h-full transition-colors duration-150 ${
          !value ? 'bg-[#E0E0E0] text-[#A0A0A0]' : 'bg-white text-[#A0A0A0]'
        }`}
        style={{
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
        }}
        onClick={() => onChange(false)}
      >
        {noLabel}
      </button>
    </div>
  </div>
);

export default ToggleButtonGroup;
