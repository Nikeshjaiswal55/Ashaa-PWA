import React from 'react';

import { ErrorMessage, Field } from 'formik';
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
}: SelectInputProps<T>) => {
  return (
    <>
      <div className="relative">
        <label className="block text-lg pl-2 font-semibold text-green-900 mb-2">{labelFirst}</label>
        {label && (
          <label
            htmlFor={name}
            className={`absolute bg-white ${labelcss}  text-green-900 top-[-15px]  left-3 block text-lg px- font-semibold text-green-900 text-gray-700 mb-1`}
          >
            {' '}
            {label}{' '}
          </label>
        )}
        <Field
          as="select"
          name={name}
          id={name}
          className={`${width} ${height}  ${
            customClass || ''
          }   rounded-lg shadow-sm  transition-colors ${
            touched[name as keyof FormValues] && errors[name as keyof FormValues]
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-green-800 focus:ring-green-500 focus:border-green-500'
          } `}
        >
          {defaultOption ? <option value="">{defaultOption}</option> : null}
          {options.map((opt) => (
            <option key={opt} value={opt === defaultOption ? '' : opt}>
              {opt}
            </option>
          ))}
        </Field>
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  );
};

export default SelectInput;
