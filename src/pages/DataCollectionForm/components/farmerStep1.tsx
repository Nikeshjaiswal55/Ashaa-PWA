import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';

import { FormValues } from '../index';

interface FarmerStep1Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const FarmerStep1: React.FC<FarmerStep1Props> = ({ values, errors, touched, setFieldValue }) => {
  const states: string[] = [
    'Select your state',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
  ];
  const districts: string[] = [
    'Select your district',
    'Pune',
    'Mumbai',
    'Bangalore Rural',
    'Chennai',
  ];

  const subDistricts: string[] = ['Select Block', 'Haveli', 'Khed', 'Hosakote', 'Sriperumbudur'];
  const farmUnits: FormValues['farmSizeUnit'][] = ['Acre', 'Hectare', 'Bigha'];
  const InputData = [
    {
      label: 'farmer Name',
      type: 'farmerName',
      name: 'farmerName',
      id: 'farmerName',
      placeholder: 'Enter farmer’s full name',
    },
    {
      label: 'Contact Number',
      type: 'contactNumber',
      name: 'contactNumber',
      id: 'contactNumber',
      placeholder: 'Enter mobile number',
    },
    {
      label: 'Aadhar Card Number',
      type: 'aadharCardNumber',
      name: 'aadharCardNumber',
      id: 'aadharCardNumber',
      placeholder: 'XXXX-XXXX-XXXX',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-2xl rounded-xl md:p-8">
        <div className="space-y-6">
          {/* farmer name - adhar no - contact number */}
          {InputData.map((input) => (
            <TextInput
              key={input.id}
              label={input.label}
              name={input.name}
              type="text"
              placeholder={input.placeholder}
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          ))}

          {/* Gender */}
          <div>
            <label className="block text-lg font-semibold text-green-900 mb-2">Gender</label>
            <div role="group" aria-labelledby="gender-group" className="flex justify-between gap-3">
              {(['Male', 'Female', 'Other'] as FormValues['gender'][]).map((genderOption) => (
                <label
                  key={genderOption}
                  className={`flex items-center w-[124px] h-[25px]  px-4 py-1 rounded-lg shadow-sm cursor-pointer transition-all duration-150 ease-in-out
                                ${
                                  values.gender === genderOption
                                    ? 'bg-green-100'
                                    : 'bg-gray-300 hover:bg-gray-200'
                                }`}
                >
                  <Field
                    type="radio"
                    name="gender"
                    value={genderOption}
                    className="accent-green-600"
                  />
                  <span className="text-lg font-semibold text-green-900 pl-2">{genderOption}</span>
                </label>
              ))}
            </div>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Total Farm Size & Unit */}
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* Input Field */}
            <div className="col-span-2">
              <label
                htmlFor="totalFarmSize"
                className="block text-sm font-semibold text-green-900 mb-1"
              >
                Total Farm Size
              </label>
              <Field
                type="number"
                name="totalFarmSize"
                id="totalFarmSize"
                placeholder="Enter your Farm Size"
                className={`w-full px-4 py-2 bg-gray-200 text-sm rounded-lg shadow-sm focus:outline-none 
                ${
                  touched.totalFarmSize && errors.totalFarmSize
                    ? 'border border-red-500'
                    : 'border border-gray-300'
                }`}
              />
              <ErrorMessage
                name="totalFarmSize"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Select Dropdown */}
            <div>
              <Field
                as="select"
                name="farmSizeUnit"
                id="farmSizeUnit"
                className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none text-green-900
                ${
                  touched.farmSizeUnit && errors.farmSizeUnit
                    ? 'border-red-500'
                    : 'border-green-800'
                }`}
              >
                {farmUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="farmSizeUnit"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* No. of Separate Farms */}
          <div>
            <label
              htmlFor="separateFarms"
              className="block text-lg font-semibold text-green-900 mb-1"
            >
              No. of Separate Farms
            </label>
            <div className="flex items-center bg-green-50 h-[53px] p-3 rounded-lg border border-green-200 shadow-sm">
              <span className="text-lg font-semibold text-green-800 flex-grow">
                Number of farms
              </span>
              <Field
                type="number"
                name="separateFarms"
                id="separateFarms"
                className={`w-20 p-2  bg-white rounded-md h-[42px]  text-center shadow-sm transition-colors
                              ${
                                touched.separateFarms && errors.separateFarms
                                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                              }`}
              />
            </div>
            <ErrorMessage
              name="separateFarms"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* State & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex ">
              <div className="flex-1">
                <SelectInput
                  label="State"
                  name="state"
                  options={states}
                  touched={touched}
                  errors={errors}
                  width="w-40"
                  defaultOption="Select option"
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="flex-1">
                <SelectInput
                  label="District"
                  name="district"
                  options={districts}
                  touched={touched}
                  errors={errors}
                  width="w-40"
                  defaultOption="Select option"
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
          </div>

          {/* Sub-District & Pin code */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <div className="flex">
              <div className="flex-1">
                <SelectInput
                  label="Sub-District"
                  name="subDistrict"
                  options={subDistricts}
                  touched={touched}
                  width="w-40"
                  errors={errors}
                  defaultOption="Select Block"
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="pinCode"
                  className="block text-lg font-semibold text-green-800 mb-1"
                >
                  Pin Code
                </label>
                <Field
                  type="text"
                  name="pinCode"
                  id="pinCode"
                  placeholder="Enter 6-digit pin code"
                  className={`w-full p-3 ml-2 border-2 border-green-800  h-[52px] rounded-lg shadow-sm transition-colors
                              ${
                                touched.pinCode && errors.pinCode
                                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                              }`}
                />
                <ErrorMessage
                  name="pinCode"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>
          </div>

          <TextInput
            label={'Village'}
            name={'village'}
            type="text"
            placeholder={'Enter your village'}
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
          />

          {/* Farmer Photo Upload */}

          <ImageUploadInput
            name="farmerPhoto"
            label="Farmer Photos"
            id="farmerPhoto"
            placeholder="Upload farmer image"
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
    </div>
  );
};

export default FarmerStep1;
