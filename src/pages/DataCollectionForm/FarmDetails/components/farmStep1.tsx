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
    <div className="flex flex-col items-center  h-[75vh]">
      <div className="w-full max-w-2xl mt-5 rounded-xl md:p-8">
        <div className="space-y-6 ">
          {/* Individual Farm Size & Unit */}
          <div className="grid grid-cols-3 gap-4 item-end">
            <div className="col-span-2">
              <SelectInput
                name="individualFarmSize"
                options={['1', '2', '3', '4', '5', '10', '20']}
                touched={touched}
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
                defaultOption="Select your Farm Size"
                width="w-full"
                label={''}
                labelFirst={'Individual Farm Size'}
                height={'h-[36px]'}
                customClass={'bg-[#005B24] text-white'}
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
                height={'h-[36px]'}
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
      </div>
    </div>
  );
};

export default FarmStep1;
