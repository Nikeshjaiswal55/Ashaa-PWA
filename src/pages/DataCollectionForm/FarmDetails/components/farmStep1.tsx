import React from 'react';

import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';

import location from '../../../../assets/FarmerFarmInfo/location.svg';
import { FarmFormValues } from '../../../DataCollectionForm/FarmDetails/index';

interface FarmStep1Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}
const farmUnits: FarmFormValues['farmSizeUnit'][] = ['Acre', 'Hectare', 'Bigha'];
const landOwnershipOptions = ['Owned', 'Leased', 'Rented', 'Government', 'Other'];
const topographyOptions = ['Plain', 'Hilly', 'Undulating', 'Plateau', 'Valley'];

const FarmStep1: React.FC<FarmStep1Props> = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="space-y-8 mt-15 h-[75vh]">
      {/* Individual Farm Size & Unit */}
      <div className="flex gap-2">
        <SelectInput<FarmFormValues>
          name="individualFarmSize"
          options={['1', '2', '3', '4', '5', '10', '20']}
          touched={touched}
          errors={errors}
          values={values}
          setFieldValue={setFieldValue}
          defaultOption="Select your Farm Size"
          width="w-[28vh]"
          label={''}
          labelFirst={'Individual Farm Size'}
          height={'h-[36px]'}
          customClass={'bg-[#005B24] text-white'}
        />

        <SelectInput
          name="farmSizeUnit"
          options={farmUnits}
          touched={touched}
          errors={errors}
          values={values}
          setFieldValue={setFieldValue}
          defaultOption="Acre"
          width="w-[120px]"
          label={''}
          height={'h-[36px]'}
          customClass={'border-2 mt-[28px]'}
          labelFirst={''}
        />
      </div>

      {/* Farm Location */}
      <TextInput
        name="farmLocation"
        label="Farm Location"
        placeholder="Pin location or enter manually"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        rightIcon={location}
        type={''}
        labelcss={''}
      />

      {/* Khasra / Survey Number */}
      <TextInput
        name="khasraNumber"
        label="Khasra / Survey Number"
        placeholder="Enter land survey number"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        type={''}
        labelcss={''}
      />

      {/* Land Ownership */}
      <SelectInput
        name="landOwnership"
        options={landOwnershipOptions}
        touched={touched}
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        defaultOption="Select your Land Ownership Status"
        width="w-full"
        label={'Land Ownership'}
        height={'h-[52px]'}
        customClass={'border-2'}
        labelcss="px-2"
        labelFirst={''}
      />

      {/* Owner Name */}
      <TextInput
        name="ownerName"
        label="Owner Name"
        placeholder="Enter farm Owner Name"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        type={''}
        labelcss={''}
      />

      {/* Topography */}
      <SelectInput
        name="topography"
        options={topographyOptions}
        touched={touched}
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        defaultOption="Select your Topography"
        width="w-full"
        label={'Topography'}
        height={'h-[52px]'}
        customClass={'border-2'}
        labelcss="px-2"
        labelFirst={''}
      />
    </div>
  );
};

export default FarmStep1;
