import React from 'react';

import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import RadioInputs from '@/components/ui/inputs/RadioInputs';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';

import location from '../../../../assets/Icons/location.svg';
import { FormValues } from '../../FarmerDetails/index';

const storageTypes = ['Warehouse', 'Cold Storage', 'Silo', 'Other'];

const capacityUnits = ['Quintals', 'Tonnes', 'Kg'];
const conditionOptions = ['Good', 'Moderate', 'Poor'];

interface FarmerStep4Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const FarmerStep4: React.FC<FarmerStep4Props> = ({ values, errors, touched, setFieldValue }) => (
  <div className="space-y-8 h-[70vh]">
    {/* Storage Facilities Type */}
    <SelectInput<FormValues>
      label="Storage Facilities Type"
      name="storageType"
      options={storageTypes}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      defaultOption="Select your Storage Facilities Type"
      width="w-full"
      height="h-[50px]"
      customClass={'border-2 '}
      labelFirst={''}
    />
    {/* Warehouse Name  */}
    <TextInput<FormValues>
      label="Warehouse Name"
      name="warehouseName"
      type="text"
      placeholder="Enter Warehouse Name"
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      labelcss={''}
    />

    {/* Warehouse Location */}
    <TextInput<FormValues>
      label="Warehouse Location"
      name="warehouseLocation"
      type="text"
      placeholder="Pin location or enter manually"
      rightIcon={location}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      labelcss={''}
    />

    {/* Capacity */}
    <div>
      <label className="text-lg font-semibold text-green-900 ">Capacity</label>
      <div className="flex items-center bg-green-100 rounded-2xl h-[33px] px-4 py-2 w-fit gap-2">
        <input
          type="number"
          name="capacity"
          value={values.capacity || ''}
          onChange={(e) => setFieldValue('capacity', e.target.value)}
          className="w-16 bg-transparent text-green-900 font-bold text-xl underline  border-none focus:ring-0 focus:outline-none"
          style={{ appearance: 'textfield' }}
        />
        <SelectInput<FormValues>
          name="capacityUnit"
          options={capacityUnits}
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          width="w-auto"
          height="h-auto"
          label=""
          customClass="bg-transparent text-gray-500 font-semibold text-lg border-none focus:ring-0 focus:outline-none"
          defaultOption={''}
          labelFirst={''}
        />
      </div>
    </div>

    {/* capacityUnit */}
    <RadioInputs<FormValues>
      label="Condition"
      name="condition"
      values={values}
      options={conditionOptions}
    />

    {/* storagePhoto */}
    <ImageUploadInput<FormValues>
      name="storagePhoto"
      label="Upload photo of storage"
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      id={''}
      placeholder={''}
    />
  </div>
);

export default FarmerStep4;
