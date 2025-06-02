import React from 'react';

import { ErrorMessage, Field, FieldArray } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import ToggleButtonGroup from '@/components/ui/inputs/ToggleButtonGroup';

import { Equipment, FormValues } from '../index';

interface FarmerStep5Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
  showForm2: boolean;
  setShowForm2: React.Dispatch<React.SetStateAction<boolean>>;
}
const farmerStep5: React.FC<FarmerStep5Props> = ({
  values,
  errors,
  touched,
  setFieldValue,
  setShowForm2,
  showForm2,
}) => {
  const EquipmentList = values.Equipment || [];

  const handleSaveAnimal = () => {
    const newEquipment: Equipment = {
      equipment: values.equipment,
      equipmentQuantity: values.equipmentQuantity,
      equipmentType: values.equipmentType, // <-- fixed here
      brandName: values.brandName,
      owner: values.owner,
      breedName: values.breedName,
      insuranceAvailable: values.insuranceAvailable,
      insuranceCompany: values.insuranceCompany,
      equipmentDocument: values.equipmentDocument,
      equipmentImage: values.equipmentImage,
    };

    setFieldValue('Equipment', [...(values.Equipment || []), newEquipment]);
    setShowForm2(false);
  };

  const vehcial = ['Tractor', 'Trolley', 'Cultivator', 'Rotavator', 'Plough', 'Seeder', 'Sprayer'];

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full max-w-2xl rounded-xl md:p-8">
        <div className="space-y-6">
          <FieldArray
            name="animals"
            render={(arrayHelpers) => (
              <div className="bg-[radial-gradient(circle,rgba(54,195,96,0.10),white)] to-white py-4 px-2">
                {/* Animal List */}

                {EquipmentList.length > 0 && (
                  <div className="mb-4">
                    {EquipmentList.map((item: Equipment, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center h-[53px] justify-between bg-[rgba(54,195,96,0.2)] rounded-2xl p-1 mb-3"
                      >
                        {/* LEFT: Image + Equipment + Brand */}
                        <div className="flex items-center gap-2">
                          <div className="relative w-10 h-10">
                            {item.equipmentImage ? (
                              <img
                                src={URL.createObjectURL(item.equipmentImage)}
                                alt="equipment"
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <div>
                            <div className="text-green-900 font-bold text-md">{item.equipment}</div>
                            <div className="text-gray-500 text-sm">{item.brandName}</div>
                          </div>
                        </div>

                        {/* MIDDLE: Quantity */}
                        <div className="bg-white rounded-xl px-4 py-1 font-bold text-green-900 text-lg shadow border h-[36px] min-w-[45px] text-center">
                          {item.equipmentQuantity}
                        </div>

                        {/* RIGHT: Equipment Type + Owner */}
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div>{item.equipmentType}</div>
                          <div className="text-green-800 font-medium">({item.owner})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Collapsible Add New Animal Section */}
                <div className="mb-4 max-w-md mx-auto">
                  <div
                    className="flex items-center justify-between bg-green-200 px-4 py-2 rounded cursor-pointer select-none"
                    onClick={() => setShowForm2((prev: boolean) => !prev)}
                  >
                    <span className="font-semibold text-green-900">+ Add New Equipment</span>
                    <span className="text-green-900 text-xl"> {showForm2 ? '▲' : '▼'} </span>
                  </div>
                  {showForm2 && (
                    // Form to Add New Animal
                    <div className="mt-2 bg-gradient-to-r from-[#d9f3e3] to-[#e9f7ef] rounded-2xl p-2 shadow-md space-y-4">
                      <div className="flex gap-2 h-12">
                        {/* animalType */}
                        <SelectInput
                          name="equipment"
                          options={vehcial}
                          touched={touched}
                          errors={errors}
                          width="w-full"
                          height="h-[40px]"
                          defaultOption=""
                          setFieldValue={setFieldValue}
                          values={values}
                          label={''}
                          customClass={'px-4 text-sm font-semibold bg-white text-green-800'}
                        />

                        {/* quantity */}
                        <Field
                          id="equipmentQuantity"
                          name="equipmentQuantity"
                          type="number"
                          className={`w-1/2 h-[40px] bg-white shadow-sm p-2 rounded-lg  ${
                            touched.equipmentQuantity && errors.equipmentQuantity
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          }`}
                        />
                        <ErrorMessage
                          name="equipmentQuantity"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* How Much Milk Your Cows Produce? */}

                      <TextInput
                        name="equipmentType"
                        label="Equipment Type"
                        placeholder="Equipment Type"
                        errors={errors}
                        touched={touched}
                        type="text"
                        setFieldValue={setFieldValue}
                        values={values}
                        labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))] '}
                      />

                      {/* Brand Name */}
                      <TextInput
                        name="brandName"
                        label="Brand Name"
                        placeholder="Enter manufacturer name"
                        errors={errors}
                        touched={touched}
                        type="text"
                        setFieldValue={setFieldValue}
                        values={values}
                        labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                      />

                      {/* milk selling place */}
                      <div className="mt-6">
                        {/* Owner */}
                        <SelectInput
                          name="owner"
                          options={['Self', 'Rented', 'Other']}
                          touched={touched}
                          errors={errors}
                          width="w-full"
                          height="h-[40px]"
                          defaultOption="Select Owner"
                          setFieldValue={setFieldValue}
                          values={values}
                          label="Owner"
                          customClass={'border-2 h-[52px]'}
                          labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))] '}
                        />
                      </div>

                      {/* breedName */}
                      <div className="mt-6">
                        <TextInput
                          name="breedName"
                          label="Breed Name"
                          placeholder="Enter Breed Name"
                          errors={errors}
                          touched={touched}
                          type="text"
                          setFieldValue={setFieldValue}
                          values={values}
                          labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.10))] '}
                        />
                      </div>

                      {/* insuranceAvailable */}
                      <ToggleButtonGroup
                        label="Insurance Available?"
                        className="bg-white"
                        value={values.insuranceAvailable}
                        onChange={(val) => setFieldValue('insuranceAvailable', val)}
                      />

                      {values.insuranceAvailable && (
                        <div className="mt-6">
                          <TextInput
                            name="insuranceCompany"
                            label="Insurance Company Name"
                            placeholder="Enter Insurance Company Name"
                            errors={errors}
                            touched={touched}
                            type="text"
                            setFieldValue={setFieldValue}
                            values={values}
                            labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))] '}
                          />
                        </div>
                      )}

                      {/* Upload Document & Image */}
                      <div>
                        <label className="text-lg w-full text-green-800 font-semibold mb-1">
                          Upload Document & Image
                        </label>
                        <div className="flex w-full gap-5">
                          <div className="w-60">
                            <ImageUploadInput
                              name="equipmentDocument"
                              label=""
                              errors={errors}
                              touched={touched}
                              values={values}
                              setFieldValue={setFieldValue}
                              id="equipmentDocument"
                              placeholder="Upload Document"
                            />
                          </div>

                          <div className="w-60">
                            <ImageUploadInput
                              name="equipmentImage"
                              label=""
                              errors={errors}
                              touched={touched}
                              values={values}
                              setFieldValue={setFieldValue}
                              id="equipmentImage"
                              placeholder="Upload Image"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSaveAnimal}
                        className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold"
                      >
                        {' '}
                        Save Animal{' '}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default farmerStep5;
