import React, { useEffect, useRef, useState } from 'react';

import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FormValues } from '../../../pages/DataCollectionForm/FarmerDetails/index';

interface SelectInputProps<T> {
  values: T;
  label: string;
  options: string[];
  name: string;
  defaultOption: string;
  width: string;
  height: string;
  labelcss?: string;
  customClass: string;
  labelFirst: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const SelectInput = <T extends object>({
  label,
  labelFirst,
  name,
  options,
  touched,
  errors,
  width,
  customClass,
  defaultOption,
  labelcss,
  height,
  values,
  setFieldValue,
}: SelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentValue = values[name as keyof typeof values] as string;
  const hasError = touched[name as keyof FormValues] && errors[name as keyof FormValues];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    setFieldValue(name, option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-lg pl-2 font-semibold text-[#005B24] mb-2">{labelFirst}</label>
      {label && (
        <label
          htmlFor={name}
          className={`absolute bg-white ${labelcss} top-[-15px] left-3 block text-lg px-2 font-semibold text-[#005B24] mb-1`}
        >
          {label}
        </label>
      )}

      {/* Custom Select Button */}
      <div
        className={`${width} ${height} ${
          customClass || ''
        } rounded-[10px] transition-colors cursor-pointer flex items-center justify-between px-3 py-2 ${
          hasError
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-green-800 focus:ring-green-500 focus:border-green-500'
        } ${!currentValue ? 'text-[#858585]' : 'text-black'}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${name}-label`}
      >
        <span className="truncate">{currentValue || defaultOption}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-green-800 rounded-[10px] shadow-lg">
          <div className="max-h-40 overflow-y-auto" role="listbox">
            {defaultOption && (
              <div
                className={`px-3 py-2 cursor-pointer hover:bg-green-100 ${
                  !currentValue ? 'bg-green-200 font-semibold' : ''
                }`}
                onClick={() => handleOptionClick('')}
                role="option"
                aria-selected={!currentValue}
              >
                {defaultOption}
              </div>
            )}
            {options.map((option) => (
              <div
                key={option}
                className={`px-3 py-2 cursor-pointer hover:bg-green-100 ${
                  currentValue === option ? 'bg-green-200 font-semibold' : ''
                }`}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={currentValue === option}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="text-red-500 text-xs mt-1">{String(errors[name as keyof FormValues])}</div>
      )}
    </div>
  );
};

export default SelectInput;
