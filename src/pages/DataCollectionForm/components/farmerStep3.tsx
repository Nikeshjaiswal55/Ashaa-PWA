import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import UnitInput from '@/components/ui/inputs/UnitInput';

import { FormValues } from '../index';

interface FarmerStep3Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const FarmerStep3: React.FC<FarmerStep3Props> = ({ values, errors, touched, setFieldValue }) => {
  console.log('i am');
  const animalTypes = ['Cow', 'Goat', 'Buffalo', 'Sheep', 'Others'];
  const milkSellingPlaces = ['Dairy', 'Village', 'Market', 'Co-operative', 'Others'];
  return (
    <div className="bg-[radial-gradient(circle,rgba(54,195,96,0.2),white)]  to-white py-4 px-2 ">
      <div className="max-w-md mx-auto bg-gradient-to-r from-[#d9f3e3] to-[#e9f7ef] bg-green-120 rounded-2xl p-2 shadow-md space-y-4">
        <div className="flex gap-2 h-12">
          {/* animal type */}
          <SelectInput
            name="animalType"
            options={animalTypes}
            touched={touched}
            errors={errors}
            width="w-1/2"
            height="h-[40px]"
            defaultOption="Select Animal Type"
            setFieldValue={setFieldValue}
            values={values}
            label={''}
          />

          {/* quantity */}

          <Field
            id="quantity"
            name="quantity"
            type="number"
            className={`w-1/2 h-[40px] bg-white shadow-sm p-2 rounded-lg  ${
              touched.quantity && errors.quantity
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            }`}
          />
          <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
        </div>

        <UnitInput
          id="milkProduction"
          name="milkProduction"
          label="How Much Milk Your Cows Produce?"
          type="number"
          unit="Ltr"
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        {/* milk selling place */}
        <SelectInput
          name="milkSellingPlace"
          options={milkSellingPlaces}
          touched={touched}
          errors={errors}
          width="w-full"
          height="h-[50px]"
          defaultOption="Select Milk Selling Place"
          setFieldValue={setFieldValue}
          values={values}
          label={''}
        />

        {values.milkSellingPlace && (
          <div className="mt-4">
            <TextInput
              name={values.milkSellingPlace}
              label={`${values.milkSellingPlace} Name`}
              placeholder={`Enter ${values.milkSellingPlace} Name`}
              errors={errors}
              touched={touched}
              type="text"
              setFieldValue={setFieldValue}
              values={values}
            />
          </div>
        )}

        {/* milk selling place */}

        <div className="mt-4">
          <TextInput
            name="breedName"
            label="Breed Name"
            placeholder="Enter Breed Name"
            errors={errors}
            touched={touched}
            type="text"
            setFieldValue={setFieldValue}
            values={values}
          />
        </div>

        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-md w-fit mb-4">
          <label className="text-sm font-bold text-green-900 mr-3">Insurance Available?</label>

          <div className="flex border border-gray-300 rounded-full overflow-hidden">
            <button
              type="button"
              className={`text-sm font-medium px-4 py-1 rounded-md ${
                values.insuranceAvailable ? 'bg-green-600 text-white' : 'bg-white text-gray-500'
              }`}
              onClick={() => setFieldValue('insuranceAvailable', true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`text-sm font-medium px-4 py-1 rounded-r-full ${
                !values.insuranceAvailable ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-500'
              }`}
              onClick={() => setFieldValue('insuranceAvailable', false)}
            >
              No
            </button>
          </div>
        </div>

        {values.insuranceAvailable && (
          <div className="mt-8">
            <TextInput
              name="insuranceCompany"
              label="Insurance Company Name"
              placeholder="Enter Insurance Company Name"
              errors={errors}
              touched={touched}
              type="text"
              setFieldValue={setFieldValue}
              values={values}
            />
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={(e) => setFieldValue('photo', e.currentTarget.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="photo" className="text-green-700 font-medium cursor-pointer">
            Upload Photo
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
        >
          Save Animal
        </button>
      </div>
    </div>
  );
};

export default FarmerStep3;
