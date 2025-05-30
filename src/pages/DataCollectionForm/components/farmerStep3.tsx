import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

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
    <div className=" bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex gap-2">
          {/* animal type */}
          <Field
            type="text"
            id="animalType"
            as="select"
            name="animalType"
            className={`w-1/2 border border-gray-300 p-2 rounded-lg    ${
              touched.animalType && errors.animalType
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            }`}
          >
            {animalTypes.map((animalTypes) => (
              <option key={animalTypes} value={animalTypes}>
                {animalTypes}
              </option>
            ))}
          </Field>
          <ErrorMessage name="animalType" component="div" className="text-red-500 text-xs mt-1" />

          {/* quantity */}

          <Field
            id="quantity"
            name="quantity"
            type="number"
            className={`w-1/2 border border-gray-300 p-2 rounded-lg  ${
              touched.quantity && errors.quantity
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            }`}
          />
          <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
        </div>

        <div>
          <label className="text-sm block font-medium text-gray-700 mb-1">
            How Much Milk Your Cows Produce?
          </label>
          <div className="flex items-center gap-2">
            <Field
              id="milkProduction"
              name="milkProduction"
              type="number"
              className={`flex-1 border border-gray-300 p-2 rounded-lg  ${
                touched.milkProduction && errors.milkProduction
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
            />
            <ErrorMessage
              name="milkProduction"
              component="div"
              className="text-red-500 text-xs mt-1"
            />

            <span className="text-sm text-gray-500">Ltr</span>
          </div>
        </div>

        <Field
          id="milkSellingPlace"
          type="number"
          as="select"
          name="milkSellingPlace"
          className={`w-full border border-gray-300 p-2 rounded-lg ${
            touched.milkSellingPlace && errors.milkSellingPlace
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          }`}
        >
          <option value="">Select Milk Selling Place</option>
          {milkSellingPlaces.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="milkSellingPlace"
          component="div"
          className="text-red-500 text-xs mt-1"
        />

        <Field
          id="breedName"
          type="number"
          name="breedName"
          className={`w-full border border-gray-300 p-2 rounded-lg ${
            touched.breedName && errors.breedName
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          }`}
          placeholder="Enter Breed Name"
        />
        <ErrorMessage name="breedName" component="div" className="text-red-500 text-xs mt-1" />

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Insurance Available?
          </label>
          <div className="flex items-center gap-3">
            <div
              className={`w-14 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer ${
                values.insuranceAvailable ? 'justify-end bg-green-500' : 'justify-start'
              }`}
              onClick={() => setFieldValue('insuranceAvailable', !values.insuranceAvailable)}
            >
              <div className="w-6 h-6 bg-white rounded-full shadow" />
            </div>
            <span className="text-sm">{values.insuranceAvailable ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {values.insuranceAvailable && (
          <Field
            name="insuranceCompany"
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Enter Insurance Company Name"
          />
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
