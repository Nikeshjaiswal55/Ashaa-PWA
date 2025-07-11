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
const farmUnits = [
  { label: 'Acre', value: 'acre' },
  { label: 'Hectare', value: 'hectare' },
  { label: 'Bigha', value: 'bigha' },
];
const landOwnershipOptions = [
  { label: 'Owned', value: 'owned' },
  { label: 'Leased', value: 'leased' },
  { label: 'Rented', value: 'rented' },
  { label: 'Government', value: 'government' },
  { label: 'Other', value: 'other' },
];
const topographyOptions = [
  { label: 'Plain', value: 'plain' },
  { label: 'Hilly', value: 'hilly' },
  { label: 'Undulating', value: 'undulating' },
  { label: 'Plateau', value: 'plateau' },
  { label: 'Valley', value: 'valley' },
];

const FarmStep1: React.FC<FarmStep1Props> = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="space-y-[23px] mt-[90px] ">
      {/* Individual Farm Size & Unit */}
      <div className="grid grid-cols-3 gap-4 item-end">
        <div className="col-span-2">
          <SelectInput
            name="individualFarmSize"
            options={[
              { label: 'Less than 1 acre', value: '<1' },
              { label: '1 to 2 acres', value: '1-2' },
              { label: '2 to 5 acres', value: '2-5' },
              { label: 'More than 5 acres', value: '>5' },
            ]}
            touched={touched}
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            defaultOption="Select your Farm Size"
            width="w-full"
            label={''}
            labelFirst={'Individual Farm Size'}
            height={'h-[32px]'}
            customClass={' border-2'}
          />
        </div>

        {/* Select Dropdown */}
        <div>
          <SelectInput
            name="farmSizeUnit"
            options={farmUnits}
            touched={touched}
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            width="w-full"
            label={''}
            height={'h-[32px]'}
            customClass={'border-2 mt-[28px]'}
            labelFirst={''}
            defaultOption={''}
          />
        </div>
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
