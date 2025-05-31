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
        <label htmlFor={id} className="text-sm block font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <Field
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`flex-1 border border-gray-300 p-2 rounded-lg ${
            touched[name as keyof FormValues] && errors[name as keyof FormValues]
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          } ${className}`}
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
};

export default UnitInput;
