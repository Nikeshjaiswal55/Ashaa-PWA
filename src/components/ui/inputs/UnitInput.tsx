import React from 'react';

import { ErrorMessage, Field, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FormValues } from '../../../pages/DataCollectionForm/index';

interface UnitInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  unit?: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
  value?: string | number;
  className?: string;
  placeholder?: string;
}
const UnitInput: React.FC<UnitInputProps> = ({
  id,
  name,
  label,
  type = 'text',
  unit,
  touched,
  errors,
  className = '',
  placeholder = '',
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-base font-semibold text-green-900 mb-2 block">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 bg-white px-3 h-[33px] w-[121px] py-3 rounded-md shadow-md w-fit">
        <Field
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-12 text-green-800 h-[25px] text-lg text-center font-semibold outline-none bg-transparent border-green-800 border-b-2 ${
            touched[name as keyof FormValues] && errors[name as keyof FormValues]
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          } ${className}`}
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        {unit && <span className="text-gray-400 text-sm font-medium">{unit}</span>}
      </div>
    </div>
  );
};

export default UnitInput;
