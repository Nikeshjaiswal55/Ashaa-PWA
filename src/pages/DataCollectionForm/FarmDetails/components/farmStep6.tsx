import React from 'react';

import { Field, FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues } from '..';
import OpenArrow from '../../../../assets/Icons/OpenArrow.svg';
import closeArrow from '../../../../assets/Icons/arrow.png';
import deleteImg from '../../../../assets/Icons/delete.svg';
import ImageUploadInput from '../../../../components/ui/inputs/ImageUploadInput';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import TextInput from '../../../../components/ui/inputs/TextInput';

interface FarmStep6Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
  showCropDetailsForm: boolean;
  setShowCropDetailsForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FarmStep6: React.FC<FarmStep6Props> = ({
  values,
  errors,
  touched,
  setFieldValue,
  showCropDetailsForm,
  setShowCropDetailsForm,
}) => {
  const seedSourceOptions: string[] = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
  const seedingRateUnitOptions: string[] = ['kg/Acre', 'Kg/hectare'];
  // Save current crop to CropList array
  const handleSaveCrop = () => {
    const crop = {
      cultivationArea: values.cultivationArea,
      cropName: values.cropName,
      cropVariety: values.cropVariety,
      seedSource: values.seedSource,
      seedingRate: values.seedingRate,
      seedingRateUnit: values.seedingRateUnit,
      seedName: values.seedName,
      cropPhoto: values.cropPhoto,
    };
    setFieldValue('CropList', [...(values.CropList || []), crop]);
    setShowCropDetailsForm(false); // Hide the form after saving
  };

  return (
    <div className="flex flex-col items-center  ">
      <div className="w-full max-w-2xl mt-8 rounded-xl md:p-8">
        <div className="space-y-6">
          {/* Crop List Array Display */}
          <FieldArray
            name="CropList"
            render={(arrayHelpers) => (
              <>
                {values.CropList && values.CropList.length > 0 && (
                  <div className="mb-4">
                    {values.CropList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-[#E6F4EC] rounded-xl px-3 py-2 mb-3"
                      >
                        {/* Left: Image + Details */}
                        <div className="flex items-center gap-3">
                          {/* Image */}
                          <div className="relative w-12 h-12 shrink-0">
                            {item.cropPhoto ? (
                              <img
                                src={URL.createObjectURL(item.cropPhoto)}
                                alt="crop"
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(idx)}
                              className="absolute -top-2 -left-2 bg-white p-1 rounded-full shadow border border-gray-200"
                              title="Delete"
                            >
                              <img src={deleteImg} alt="delete" />
                            </button>
                          </div>

                          {/* Text Info */}
                          <div className="flex flex-col justify-center">
                            <span className="font-semibold text-green-900 leading-tight text-sm">
                              {item.cropName}
                            </span>
                            <span className="text-[12px] text-gray-600 leading-tight">
                              Variety: <span className="font-medium">{item.cropVariety}</span>
                            </span>
                            <span className="text-[12px] text-gray-600 leading-tight">
                              Seeding Rate:{' '}
                              <span className="font-medium">
                                {item.seedingRate} {item.seedingRateUnit}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Right: Edit Button */}
                        <button
                          type="button"
                          className="bg-green-800 hover:bg-green-700 p-2 rounded-xl text-white shrink-0"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    ))}
                  </div>
                )}

                {/* Add New Crop Button */}
                <div className="mb-4 max-w-md mx-auto">
                  <div
                    className="flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none"
                    onClick={() => setShowCropDetailsForm((prev) => !prev)}
                  >
                    <span className="font-semibold text-green-900 text-base">+ Add New Crop</span>
                    <span className="text-green-900 text-2xl font-bold">
                      {showCropDetailsForm ? (
                        <img src={OpenArrow} className="w-6 h-5" alt="open arrow"></img>
                      ) : (
                        <img src={closeArrow} className="w-6 h-3" alt="close arrow"></img>
                      )}
                    </span>
                  </div>
                </div>

                {/* Crop Form */}
                {showCropDetailsForm && (
                  <div className="mt-2  rounded-[10px] p-2 space-y-[23px] bg-[radial-gradient(circle,rgba(54,195,96,0.2))] mb-[112px]">
                    <div className="mt-3">
                      <TextInput<FarmFormValues>
                        label="Cultivation Area"
                        name="cultivationArea"
                        placeholder="Enter area under cultivation"
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        type="text"
                        labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                      />
                    </div>
                    <TextInput<FarmFormValues>
                      label="Crop Name"
                      name="cropName"
                      placeholder="Enter crop name"
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      type=""
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                    />
                    <TextInput<FarmFormValues>
                      label="Crop Variety"
                      name="cropVariety"
                      placeholder="Enter variety name"
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      type=""
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                    />
                    <SelectInput<FarmFormValues>
                      label="Seed Source"
                      name="seedSource"
                      options={seedSourceOptions}
                      defaultOption="Enter seed supplier"
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      customClass="border-2"
                      width="w-full"
                      height="h-[52px]"
                      labelFirst=""
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                    />
                    {/* Seeding Rate */}
                    <div>
                      <label className="block text-green-900 font-semibold ">Seeding Rate</label>
                      <span className="text-xs text-gray-500">Kg per acre/hectare</span>

                      <div className="flex justify-between bg-white rounded-md px-4 py-3 mt-1  w-full">
                        {/* Input + kg suffix */}
                        <div className="relative flex items-center">
                          <Field
                            name="seedingRate"
                            type="number"
                            as="input"
                            placeholder="100"
                            className="w-15  bg-transparent text-green-900 font-bold text-lg border-b-2 border-green-700 focus:ring-0 focus:outline-none pr-0"
                            style={{ appearance: 'textfield' }}
                          />
                          <span className="absolute right-1 text-gray-400 font-semibold text-lg pointer-events-none">
                            kg
                          </span>
                        </div>

                        {/* Unit Selector */}
                        <SelectInput<FarmFormValues>
                          name="seedingRateUnit"
                          options={seedingRateUnitOptions}
                          defaultOption=""
                          values={values}
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue}
                          customClass="ml-4 border border-green-800 text-green-900 font-semibold rounded-lg px-3 py-1"
                          width="w-[120px]"
                          height="h-[38px]"
                          label=""
                          labelFirst=""
                        />
                      </div>

                      {errors.seedingRate && touched.seedingRate && (
                        <div className="text-red-500 text-xs mt-1">{errors.seedingRate}</div>
                      )}
                    </div>

                    <TextInput<FarmFormValues>
                      label="Seed Name"
                      name="seedName"
                      placeholder="Enter Seed Name"
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      type=""
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                    />
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">
                        Upload Crop Photo
                      </label>
                      <ImageUploadInput<FarmFormValues>
                        name="cropPhoto"
                        id="cropPhoto"
                        placeholder="Upload Photo"
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        height="h-[81px]"
                        label=""
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[#005B24] text-white font-normal text-base h-[34px]  rounded-[10px] shadow-md w-full"
                      onClick={handleSaveCrop}
                    >
                      Save Crop
                    </button>
                  </div>
                )}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FarmStep6;
