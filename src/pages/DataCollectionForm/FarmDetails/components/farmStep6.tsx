import React from 'react';

import { Field, FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues } from '..';
import ImageUploadInput from '../../../../components/ui/inputs/ImageUploadInput';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import TextInput from '../../../../components/ui/inputs/TextInput';

const seedSourceOptions = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
const seedingRateUnitOptions = ['kg/Acre', 'kg/Hectare'];

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
                    className="flex items-center justify-between bg-[rgba(54,195,96,0.08)] rounded-xl p-2 mb-3"
                  >
                    <div className="flex items-center gap-3">
                      {/* Photo */}
                      <div className="relative w-12 h-12">
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
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(idx)}
                          className="absolute -top-2 -left-2 bg-white p-1 rounded-full shadow border border-gray-200"
                          title="Delete"
                        >
                          <span className="text-red-500 font-bold">×</span>
                        </button>
                      </div>
                      {/* Details */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-green-900 text-sm">
                          {item.cropName}
                        </span>
                        <span className="text-xs text-gray-600">
                          Variety: <span className="font-medium">{item.cropVariety}</span>
                        </span>
                        <span className="text-xs text-gray-600">
                          Seeding Rate:{' '}
                          <span className="font-medium">
                            {item.seedingRate} {item.seedingRateUnit}
                          </span>
                        </span>
                      </div>
                    </div>
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
                  {showCropDetailsForm ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Crop Form */}
            {showCropDetailsForm && (
              <div className="mt-2 bg-gradient-to-r mx-2 from-[#d9f3e3] to-[#e9f7ef] rounded-2xl p-2 shadow-md space-y-6">
                <TextInput
                  label="Cultivation Area"
                  name="cultivationArea"
                  placeholder="Enter area under cultivation"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <TextInput
                  label="Crop Name"
                  name="cropName"
                  placeholder="Enter crop name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <TextInput
                  label="Crop Variety"
                  name="cropVariety"
                  placeholder="Enter variety name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <SelectInput
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
                />
                {/* Seeding Rate */}
                <div>
                  <label className="block text-green-900 font-semibold mb-1">Seeding Rate</label>
                  <span className="text-xs text-gray-500">Kg per acre/hectare</span>
                  <div className="flex items-center bg-[rgba(54,195,96,0.08)] rounded-lg px-4 py-3 mt-1">
                    <Field
                      name="seedingRate"
                      type="number"
                      as="input"
                      placeholder="100"
                      className="w-24 bg-transparent text-green-900 font-bold text-lg border-b-2 border-gray-400 focus:ring-0 focus:outline-none pr-10"
                      style={{ appearance: 'textfield' }}
                    />
                    <span className="absolute right-2 text-gray-500 font-semibold text-lg pointer-events-none">
                      kg
                    </span>
                    <SelectInput
                      name="seedingRateUnit"
                      options={seedingRateUnitOptions}
                      defaultOption="kg/Acre"
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      customClass="ml-2 border-2"
                      width="w-[120px]"
                      height="h-[40px]"
                      label=""
                      labelFirst=""
                    />
                  </div>
                  {errors.seedingRate && touched.seedingRate && (
                    <div className="text-red-500 text-xs mt-1">{errors.seedingRate}</div>
                  )}
                </div>
                <TextInput
                  label="Seed Name"
                  name="seedName"
                  placeholder="Enter Seed Name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <div>
                  <label className="block text-green-900 font-semibold mb-1">
                    Upload Crop Photo
                  </label>
                  <ImageUploadInput
                    name="cropPhoto"
                    id="cropPhoto"
                    placeholder="Upload Photo"
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    height="h-[167px]"
                    label=""
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md w-full"
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
  );
};

export default FarmStep6;
