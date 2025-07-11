import React, { useState } from 'react';

import { FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues, waterManagement } from '..';
import OpenArrow from '../../../../assets/Icons/OpenArrow.svg';
import closeArrow from '../../../../assets/Icons/arrow.png';
import DeleteImg from '../../../../assets/Icons/delete.svg';
import ImageUploadInput from '../../../../components/ui/inputs/ImageUploadInput';
import RadioInputs from '../../../../components/ui/inputs/RadioInputs';
import SelectInput from '../../../../components/ui/inputs/SelectInput';

const waterSourceOptions = [
  { label: 'Canal', value: 'Canal' },
  { label: 'Borewell', value: 'Borewell' },
  { label: 'Pond', value: 'Pond' },
  { label: 'River', value: 'River' },
  { label: 'Rainwater', value: 'Rainwater' },
  { label: 'Other', value: 'Other' },
];

const retentionOptions = ['Low', 'Medium', 'High'];
const drainageOptions = ['Good', 'Moderate', 'Poor'];

interface FarmStep4Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}
const FarmStep4: React.FC<FarmStep4Props> = ({ values, errors, touched, setFieldValue }) => {
  const waterManagementList = values.waterManagement || [];
  const [showWaterManagementForm, setShowWaterManagementForm] = useState(true); //for show or hide form

  const handleSaveAnimal = () => {
    // Construct the new animal from form values
    const WaterManagement: waterManagement = {
      waterSourcePhoto: values.waterSourcePhoto,
      waterRetentionCapacity: values.waterRetentionCapacity,
      drainageQuality: values.drainageQuality,
      waterSource: values.waterSource,
    };
    setFieldValue('waterManagement', [...(values.waterManagement || []), WaterManagement]);
    // Reset animal fields after save
    setShowWaterManagementForm(false);
    setShowWaterManagementForm(false); // Hide the form after saving
  };

  return (
    <div className="w-full max-w-2xl mt-5 rounded-xl md:p-8">
      <FieldArray
        name="waterManagment"
        render={(arrayHelpers) => (
          <>
            {/* List */}
            {waterManagementList.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between h-18 items-center bg-[rgba(54,195,96,0.2)] rounded-2xl p-2 mb-6 shadow-sm"
              >
                {/* Left: Image & Delete Button */}
                <div className="relative w-14 h-14 shrink-0">
                  {item.waterSourcePhoto ? (
                    <img
                      src={URL.createObjectURL(item.waterSourcePhoto)}
                      alt="water"
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border">
                      No Image
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(idx)}
                    className="absolute -top-2 -left-2 bg-white p-1 rounded-full shadow-md border"
                    title="Delete"
                  >
                    <img src={DeleteImg} alt="Delete" className="h-4 w-4" />
                  </button>
                </div>

                {/* Center: Water Info */}
                <div className="flex flex-col flex-1 mx-4">
                  <span className="font-semibold text-green-900 text-base leading-tight">
                    {item.waterSource}
                  </span>
                  <span className="text-sm text-gray-600 leading-tight">
                    Retention: <span className="font-medium">{item.waterRetentionCapacity}</span>
                  </span>
                  <span className="text-sm text-gray-600 leading-tight">
                    Drainage: <span className="font-medium">{item.drainageQuality}</span>
                  </span>
                </div>

                {/* Right: Edit Button */}
                <div>
                  <button
                    type="button"
                    className="bg-[#005B24] hover:bg-green-600 p-2 rounded-xl text-white transition duration-150 ease-in-out"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5l3 3L13 14h-3v-3L18.5 2.5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Wat er Source Section */}
            <div className=" max-w-md  mx-auto mt-[49px]">
              <div
                className="flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed mb-5 border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none"
                onClick={() => setShowWaterManagementForm((prev) => !prev)}
              >
                <span className="font-semibold text-green-900 text-base">
                  + Add New Water Source
                </span>
                <span className="text-green-900 text-2xl font-bold">
                  {showWaterManagementForm ? (
                    <img src={OpenArrow} className="w-6 h-5" alt="open arrow"></img>
                  ) : (
                    <img src={closeArrow} className="w-6 h-3" alt="close arrow"></img>
                  )}
                </span>
              </div>

              {showWaterManagementForm && (
                <div
                  className="  rounded-[10px] space-y-[23px] px-2 py-2"
                  style={{ background: 'rgba(54, 195, 96, 0.2)' }}
                >
                  <div className="flex"></div>
                  <>
                    <SelectInput
                      values={values}
                      label="Water Sources"
                      labelFirst=""
                      name="waterSource"
                      options={waterSourceOptions}
                      defaultOption="Select your Water Sources"
                      width="w-full"
                      height="h-[48px]"
                      customClass="border-2"
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      labelcss="px-2 bg-[radial-gradient(circle,rgba(54,195,96,0.2))]"
                    />
                    <div>
                      <label className="block text-lg font-semibold text-green-900 ">
                        Upload Water Sources Photo
                      </label>
                      <ImageUploadInput
                        values={values}
                        name="waterSourcePhoto"
                        label=""
                        id="waterSourcePhoto"
                        placeholder="Upload Photo"
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        height="h-[81px]"
                      />
                    </div>
                    <RadioInputs
                      label="Water Retention Capacity"
                      name="waterRetentionCapacity"
                      values={values}
                      options={retentionOptions}
                    />
                    <RadioInputs
                      label="Drainage Quality"
                      name="drainageQuality"
                      values={values}
                      options={drainageOptions}
                    />
                    <button
                      onClick={handleSaveAnimal}
                      className="w-full h-[34px] bg-[#005B24] text-white  rounded-lg font-semibold"
                    >
                      {' '}
                      Save Animal{' '}
                    </button>{' '}
                  </>
                </div>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default FarmStep4;
