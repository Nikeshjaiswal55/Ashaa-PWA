import React from 'react';

import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import RadioInputs from '@/components/ui/inputs/RadioInputs';
import TextInput from '@/components/ui/inputs/TextInput';

import location from '../../../../assets/Icons/location.svg';
import { FormValues } from '../../FarmerDetails/index';

interface FarmerStep1Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const FarmerStep1: React.FC<FarmerStep1Props> = ({ values, errors, touched, setFieldValue }) => {
  console.log('FarmerStep1 touch: ', touched);

  // const { data } = useGetStateQuery({});
  // const stateOptions = data?.data || [];
  // console.log(stateOptions);

  // const selectedStateId = values.state || '';
  // const { data: districtData } = useGetDistrictByStateQuery(
  //   selectedStateId ? selectedStateId : skipToken,
  // );

  // const districtOptions = districtData?.data || [];
  // console.log('district option: ', districtOptions);

  // const selectedDistrictId = values.district || '';
  // console.log(selectedDistrictId);

  // //sub district
  // const { data: tehsilData } = useGetTehsilByDistrictQuery(
  //   selectedDistrictId ? selectedDistrictId : skipToken,
  // );
  // const tehsilOptions = tehsilData?.data || [];
  // const selectedTehsil = values.subDistrict || '';

  // const { data: villageData } = useGetVillagesByTehsilQuery(
  //   selectedTehsil ? selectedTehsil : skipToken,
  // );
  // const villageOptions = villageData?.data || [];

  const farmUnits: FormValues['farmSizeUnit'][] = ['Acre', 'Hectare', 'Bigha'];

  const InputData = [
    {
      label: 'farmer Name',
      type: 'farmerName',
      name: 'farmerName',
      id: 'farmerName',
      placeholder: "Enter farmer's full name",
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
    <div className="space-y-[23px] mt-[59px] pb-[74px]">
      {InputData.map((input) => (
        <TextInput<FormValues>
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

      <RadioInputs<FormValues>
        values={values}
        name="gender"
        label={'Gender'}
        options={['Male', 'Female', 'Other']}
      />

      <div className="grid grid-cols-3 gap-4 items-end">
        <div className="col-span-2">
          <label
            htmlFor="totalFarmSize"
            className="block text-lg font-semibold text-[#005B24] mb-1"
          >
            Total Farm Size
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

        <div>
          <Field
            as="select"
            name="farmSizeUnit"
            id="farmSizeUnit"
            className={`w-full px-4 py-2 h-[36px] text-sm border-[2px] rounded-lg shadow-sm focus:outline-none text-[#005B24] ${
              touched.farmSizeUnit && errors.farmSizeUnit ? 'border-red-500' : 'border-green-800'
            }`}
          >
            {farmUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Field>
          <ErrorMessage name="farmSizeUnit" component="div" className="text-red-500 text-xs mt-1" />
        </div>
      </div>

      <div>
        <div className="flex items-center bg-[rgba(54,195,96,0.2)] h-[53px] p-3 rounded-lg border border-green-200 shadow-sm">
          <span className="text-lg font-semibold text-[#005B24] flex-grow">
            No. of Separate Farms
          </span>
          <Field
            type="number"
            name="separateFarms"
            id="separateFarms"
            className={`w-20 p-2 bg-white text-[#005B24] font-semibold text-lg border-[2px] underline rounded-md h-[42px] text-center shadow-sm border-b-2 ${
              touched.separateFarms && errors.separateFarms
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            }`}
          />
        </div>
        <ErrorMessage name="separateFarms" component="div" className="text-red-500 text-xs mt-1" />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <SelectInput<FormValues>
              label="State"
              name="state"
              options={stateOptions}
              touched={touched}
              errors={errors}
              width="w-full"
              height="h-[52px]"
              defaultOption="Select State"
              values={values}
              setFieldValue={setFieldValue}
              customClass={'border-[2px]'}
              labelFirst={''}
            />
          </div>
          <div className="flex-1">
            <SelectInput<FormValues>
              label="District"
              name="district"
              options={districtOptions}
              touched={touched}
              errors={errors}
              width="w-full"
              height="h-[52px]"
              defaultOption="Select District"
              values={values}
              setFieldValue={setFieldValue}
              customClass={'border-[2px]'}
              labelFirst={''}
            />
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 mb-9 h-[52px] md:grid-cols-2 w-full ">
        <div className="flex gap-3">
          <div className="flex-1">
            <SelectInput<FormValues>
              label="Sub-District"
              name="subDistrict"
              options={tehsilOptions}
              touched={touched}
              width="w-full"
              height="h-[52px]"
              errors={errors}
              defaultOption="Select Block"
              setFieldValue={setFieldValue}
              values={values}
              customClass={'border-[2px]'}
              labelFirst={''}
            />
          </div>
          <div className="flex-1 ml-2 mt-2">
            <TextInput<FormValues>
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
      </div> */}

      {/* <SelectInput<FormValues>
        label="Village"
        name="village"
        options={villageOptions}
        touched={touched}
        width="w-full"
        height="h-[52px]"
        errors={errors}
        defaultOption="Select Your Village"
        setFieldValue={setFieldValue}
        values={values}
        customClass={'border-[2px]'}
        labelFirst={''}
      /> */}
      <TextInput<FormValues>
        label="Current Location"
        name="currentLocation"
        type="text"
        placeholder="Enter your current location"
        values={values}
        errors={errors}
        rightIcon={location}
        touched={touched}
        setFieldValue={setFieldValue}
        labelcss=""
        // autoFocus // yeh line cursor ko iss field par laayegi jab component load hoga
      />

      {/*  Years of Farming Experience */}
      <TextInput<FormValues>
        label="Years of Farming Experience"
        name="yearsOfExperience"
        type="text"
        placeholder="Enter number of years"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        labelcss={''}
      />

      <ImageUploadInput<FormValues>
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
  );
};

export default FarmerStep1;
