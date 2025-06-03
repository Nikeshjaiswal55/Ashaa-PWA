import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import RadioInputs from '@/components/ui/inputs/RadioInputs';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';

// Update the path below to the actual location of your FormValues type
import { FormValues } from '../../FarmerDetails/index';

interface FarmerStep1Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const FarmerStep1: React.FC<FarmerStep1Props> = ({ values, errors, touched, setFieldValue }) => {
  // Define the options for states, districts, sub-districts, and farm units
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
      <div className="w-full max-w-2xl mt-8 rounded-xl md:p-8">
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
              labelcss={''}
            />
          ))}

          {/* gender */}
          <RadioInputs
            values={values}
            name="gender"
            label={'gender'}
            options={['Male', 'Female', 'Other']}
          />

          {/* Total Farm Size & Unit */}
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="col-span-2">
              <label
                htmlFor="totalFarmSize"
                className="block text-lg font-semibold text-green-900 mb-1"
              >
                {' '}
                Total Farm Size{' '}
              </label>
              <Field
                type="number"
                name="totalFarmSize"
                id="totalFarmSize"
                placeholder="Enter your Farm Size"
                className={`w-full h-[36px] px-4 py-2 bg-gray-300 text-sm rounded-lg shadow-sm focus:outline-none placeholder-green-800 ${
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
                className={`w-full px-4 py-2 h-[36px] text-sm border-2 rounded-lg shadow-sm focus:outline-none text-green-900 ${
                  touched.farmSizeUnit && errors.farmSizeUnit
                    ? 'border-red-500'
                    : 'border-green-800'
                }`}
              >
                {' '}
                {farmUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {' '}
                    {unit}{' '}
                  </option>
                ))}{' '}
              </Field>
              <ErrorMessage
                name="farmSizeUnit"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>
          {/* Total Farm Size & Unit */}

          {/* No. of Separate Farms */}
          <div>
            <div className="flex items-center  bg-[rgba(54,195,96,0.2)] h-[53px] p-3 rounded-lg border border-green-200 shadow-sm">
              <span className="text-lg font-semibold  text-green-900 flex-grow">
                {' '}
                No. of Separate Farms{' '}
              </span>
              <Field
                type="number"
                name="separateFarms"
                id="separateFarms"
                className={`w-20 p-2 bg-white text-green-800 font-semibold text-lg border-2 underline  rounded-md h-[42px] text-center shadow-sm  border-b-2   ${
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
            <div className="flex  gap-4">
              <div className="flex-1">
                <SelectInput
                  label="State"
                  name="state"
                  options={states}
                  touched={touched}
                  errors={errors}
                  width="w-full"
                  height="h-[52px]"
                  defaultOption="Select option"
                  values={values}
                  setFieldValue={setFieldValue}
                  customClass={'border-2'}
                />
              </div>
              <div className="flex-1 ">
                <SelectInput
                  label="District"
                  name="district"
                  options={districts}
                  touched={touched}
                  errors={errors}
                  width="w-full"
                  height="h-[52px]"
                  defaultOption="Select option"
                  values={values}
                  setFieldValue={setFieldValue}
                  customClass={'border-2'}
                />
              </div>
            </div>
          </div>

          {/* Sub-District & Pin code */}
          <div className="grid grid-cols-1 mb-9 h-[52px] md:grid-cols-2 w-full ">
            <div className="flex gap-3">
              <div className="flex-1 ">
                {/* sub-district */}
                <SelectInput
                  label="Sub-District"
                  name="subDistrict"
                  options={subDistricts}
                  touched={touched}
                  width="w-full"
                  height="h-[52px]"
                  errors={errors}
                  defaultOption="Select Block"
                  setFieldValue={setFieldValue}
                  values={values}
                  customClass={'border-2'}
                />
              </div>
              <div className="flex-1 ml-2">
                <TextInput
                  label={'Pin Code'}
                  name={'pinCode'}
                  type="text"
                  placeholder={'Enter 6-digit pin code'}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  labelcss={''}
                />
              </div>
            </div>
          </div>

          {/* Village */}
          <TextInput
            label={'Village'}
            name={'village'}
            type="text"
            placeholder={'Enter your village'}
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            labelcss={''}
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
