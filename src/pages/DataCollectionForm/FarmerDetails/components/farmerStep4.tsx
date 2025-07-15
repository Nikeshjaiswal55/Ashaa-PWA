import React from 'react';

import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import RadioInputs from '@/components/ui/inputs/RadioInputs';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import { useGetStorageListQuery } from '@/redux/slices/ApiSlice';

import location from '../../../../assets/Icons/location.svg';
import { FormValues } from '../../FarmerDetails/index';

const capacityUnits: { label: string; value: string }[] = [
  { label: 'Tonnes', value: 'tonnes' },
  { label: 'Kg', value: 'kg' },
];

interface FarmerStep4Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const FarmerStep4: React.FC<FarmerStep4Props> = ({ values, errors, touched, setFieldValue }) => {
  const { data } = useGetStorageListQuery({});
  const storageName = data?.data || [];

  return (
    <div className="mt-[80px] space-y-[23px]">
      {/* Storage Facilities Type */}
      <SelectInput<FormValues>
        label="Storage Facilities Type"
        name="storageType"
        options={storageName}
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        defaultOption="Select your Storage Facilities Type"
        width="w-full"
        height="h-[50px]"
        customClass={'border-[2px] '}
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
        <label className="text-lg font-semibold text-[#005B24] ">Capacity</label>
        <div className="flex items-center bg-green-100 rounded-2xl w-[185px] h-[33px] px-2 py-2 w-fit ">
          <input
            type="number"
            name="capacity"
            value={values.capacity || ''}
            onChange={(e) => setFieldValue('capacity', e.target.value)}
            className="w-16 bg-transparent text-[#005B24] font-bold text-xl underline  border-none focus:ring-0 focus:outline-none"
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
            customClass="bg-transparent text-gray-500 font-normal text-sm border-none focus:ring-0 focus:outline-none"
            defaultOption={'Quintity'}
            labelFirst={''}
          />
        </div>
      </div>

      <RadioInputs<FormValues>
        label="Condition"
        name="condition"
        values={values}
        options={['Good', 'Moderate', 'Poor']}
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
};

export default FarmerStep4;
