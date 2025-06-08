import React, { useState } from 'react';

import { FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues, waterManagement } from '..';
import DeleteImg from '../../../../assets/Icons/delete.svg';
import ImageUploadInput from '../../../../components/ui/inputs/ImageUploadInput';
import RadioInputs from '../../../../components/ui/inputs/RadioInputs';
import SelectInput from '../../../../components/ui/inputs/SelectInput';

const waterSourceOptions = ['Canal', 'Borewell', 'Pond', 'River', 'Rainwater', 'Other'];
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
  const [showWaterManagementForm, setShowWaterManagementForm] = useState(false); //for show or hide form

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
    <div className="space-y-6 h-[70vh]">
      <FieldArray
        name="waterManagment"
        render={(arrayHelpers) => (
          <>
            {/* List */}
            {waterManagementList.length > 0 && (
              <div className="mb-4">
                {waterManagementList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center h-[70px] justify-between bg-[rgba(54,195,96,0.2)] rounded-2xl p-2 mb-3"
                  >
                    {/* LEFT: Photo */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        {item.waterSourcePhoto ? (
                          <img
                            src={URL.createObjectURL(item.waterSourcePhoto)}
                            alt="water"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(idx)}
                          className="absolute -top-2 -left-2 bg-white p-1 rounded-full shadow border border-gray-200"
                          title="Delete"
                        >
                          <img src={DeleteImg} alt="Delete" className="h-4 w-4" />
                        </button>
                      </div>
                      {/* MIDDLE: Details */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-green-900 text-sm">
                          {item.waterSource}
                        </span>
                        <span className="text-xs text-gray-600">
                          Retention:{' '}
                          <span className="font-medium">{item.waterRetentionCapacity}</span>
                        </span>
                        <span className="text-xs text-gray-600">
                          Drainage: <span className="font-medium">{item.drainageQuality}</span>
                        </span>
                      </div>
                      {/* RIGHT: Milk Info + Edit */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="bg-green-800 hover:bg-green-700 p-2 rounded-xl text-white"
                          title="Edit"
                        >
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {' '}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5l3 3L13 14h-3v-3L18.5 2.5z"
                            />{' '}
                          </svg>{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Wat er Source Section */}
            <div className="mb-4 max-w-md  mx-auto">
              <div
                className="flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none"
                onClick={() => setShowWaterManagementForm((prev) => !prev)}
              >
                <span className="font-semibold text-green-900 text-base">
                  + Add New Water Source
                </span>
                <span className="text-green-900 text-2xl font-bold">
                  {showWaterManagementForm ? '▲' : '▼'}
                </span>
              </div>

              {showWaterManagementForm && (
                <div
                  className="mt-2 mx-2 rounded-2xl p-2 space-y-8"
                  style={{ background: 'rgba(54, 195, 96, 0.2)' }}
                >
                  <div className="flex gap-2 "></div>
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
                      <label className="block text-lg font-semibold text-green-900 mb-2">
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
                      className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold"
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
