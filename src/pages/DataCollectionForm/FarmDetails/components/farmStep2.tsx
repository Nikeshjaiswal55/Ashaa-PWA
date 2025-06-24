import React from 'react';

import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import TextInput from '@/components/ui/inputs/TextInput';

import { FarmFormValues } from '..';
import RadioInputs from '../../../../components/ui/inputs/RadioInputs';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import ToggleButtonGroup from '../../../../components/ui/inputs/ToggleButtonGroup';

const irrigationOptions = ['Drip', 'Flood', 'Sprinkler'];
const laborOptions = ['Family', 'Hired', 'Seasonal'];
const marketOptions = ['Mandi', 'Society', 'Private'];
const farmingApproachOptions = ['Organic', 'Conventional'];
const croppingPatternOptions = ['Mono', 'Mixed'];

interface FarmStep2Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}
const FarmStep2: React.FC<FarmStep2Props> = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="space-y-[37px] mt-[23px]">
      {/* Irrigation Method */}
      <RadioInputs
        label="Irrigation Method"
        name="irrigationMethod"
        values={values}
        options={irrigationOptions}
      />

      {/* Do farmers have KCC? */}
      <ToggleButtonGroup
        label="Do farmers have KCC?"
        value={values.hasKCC}
        onChange={(val) => setFieldValue('hasKCC', val)}
        className="bg-[radial-gradient(circle,rgba(54,195,96,0.2))]"
      />

      {/* Loan Approved? */}
      <ToggleButtonGroup
        label="Loan Approved?"
        value={values.loanApproved}
        onChange={(val) => setFieldValue('loanApproved', val)}
        className="bg-[radial-gradient(circle,rgba(54,195,96,0.2))] "
      />

      {/* Labor Availability */}
      <RadioInputs
        label="Labor Availability"
        name="laborAvailability"
        values={values}
        options={laborOptions}
      />

      {/* Hired Labor Payment */}
      {values.laborAvailability === 'Hired' && (
        <TextInput
          name="hiredLaborPayment"
          label="Hired Labor Payment"
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          values={values}
          placeholder="Enter ₹ per day"
          type={''}
          labelcss={''}
        />
      )}

      {/* Farming Approach */}
      <SelectInput
        values={values}
        label="Farming Approach"
        labelFirst=""
        name="farmingApproach"
        options={farmingApproachOptions}
        defaultOption="Select your Farming Approach"
        width="w-full"
        height="h-[52px]"
        customClass="border-2"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        labelcss="px-2"
      />

      {/* Cropping Pattern */}
      <SelectInput
        values={values}
        label="Cropping Pattern"
        labelFirst=""
        name="croppingPattern"
        options={croppingPatternOptions}
        defaultOption="Select your Cropping Pattern"
        width="w-full"
        height="h-[52px]"
        customClass="border-2"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        labelcss="px-2"
      />

      {/* Primary Market */}
      <RadioInputs
        label="Primary Market"
        name="primaryMarket"
        values={values}
        options={marketOptions}
      />
    </div>
  );
};

export default FarmStep2;
