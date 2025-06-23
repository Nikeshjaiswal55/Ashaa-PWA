import React from 'react';

import { ErrorMessage, Field, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

interface UnitInputProps<T> {
  id: string;
  name: string;
  label: string;
  type?: string;
  unit?: string;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: FormikHelpers<T>['setFieldValue'];
  value?: string | number;
  className?: string;
  placeholder?: string;
}
const UnitInput = <T extends object>({
  id,
  name,
  label,
  type = 'text',
  unit,
  touched,
  errors,
  className = '',
  placeholder = '',
}: UnitInputProps<T>) => {
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
          className={`w-12 text-[#005B24] h-[25px] text-lg text-center font-semibold outline-none bg-transparent border-green-800 border-b-2 ${
            touched[name as keyof T] && errors[name as keyof T]
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
