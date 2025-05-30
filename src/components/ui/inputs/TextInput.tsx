import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

interface TextInputProps {
  values: FormValues;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type,
  placeholder,

  errors,
  touched,
}) => {
  return (
    <>
      <div className="relative">
        <label
          htmlFor={name}
          className="absolute bg-white text-green-900 top-[-15px] left-3 block text-lg px-2 font-semibold text-gray-700 mb-1"
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
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  );
};
export default TextInput;
