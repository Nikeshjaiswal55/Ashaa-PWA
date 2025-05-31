import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FormValues } from '../../../pages/DataCollectionForm/index';

interface SelectInputProps {
  values: FormValues;
  label: string;
  options: string[];
  name: string;
  defaultOption: string;
  width: string;
  height: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  touched,
  errors,
  width,
  defaultOption,
  height,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block text-lg font-semibold text-green-900 mb-1">
          {label}
        </label>
      )}
      <Field
        as="select"
        name={name}
        id={name}
        className={`${width} ${height}  border-2 rounded-lg shadow-sm bg-gray-50 transition-colors
          ${
            touched[name] && errors[name]
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-green-800 focus:ring-green-500 focus:border-green-500'
          } `}
      >
        <option value="">{defaultOption}</option>
        {options.map((opt) => (
          <option key={opt} value={opt === defaultOption ? '' : opt}>
            {opt}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </>
  );
};

export default SelectInput;
