import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FormValues } from '../../../pages/DataCollectionForm/FarmerDetails/index';

interface TextInputProps<T> {
  values: T;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  labelcss: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
  rightIcon?: React.ReactNode; // rightIcon prop uses React.ReactNode so that you can pass any React element, icon, button, or text as a prop. // React.ReactNode is a flexible type that allows string, number, JSX, fragments, arrays, null, etc.
}
const TextInput = <T extends object>({
  label,
  name,
  type,
  placeholder,
  rightIcon,
  labelcss,
  errors,
  touched,
}: TextInputProps<T>) => {
  return (
    <>
      <div className="relative">
        <label
          htmlFor={name}
          className={`absolute bg-white ${labelcss} text-green-900 top-[-15px] left-3 block text-lg px-2 font-semibold text-gray-700 mb-1`}
        >
          {label}
        </label>
        <Field
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`w-full p-3 border rounded-lg shadow-sm transition-colors border-2 
          ${
            touched[name as keyof typeof touched] && errors[name as keyof typeof errors]
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-green-800 focus:ring-green-500 focus:border-green-500'
          }`}
        />
        {/* ...select code */}

        {rightIcon && (
          <div className="absolute h-[52px] bg-green-900 w-[50px] right-0 rounded-sm  top-0 flex items-center justify-center">
            {typeof rightIcon === 'string' ? <img src={rightIcon} alt="location" /> : rightIcon}
          </div>
        )}

        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  );
};
export default TextInput;
