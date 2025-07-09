import React from 'react';

import { ErrorMessage, Field, FieldArray } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import ToggleButtonGroup from '@/components/ui/inputs/ToggleButtonGroup';
import { useGetEquipementQuery } from '@/redux/slices/ApiSlice';

import OpenArrow from '../../../../assets/Icons/OpenArrow.svg';
import closeArrow from '../../../../assets/Icons/arrow.png';
import deleteIcon from '../../../../assets/Icons/delete.svg';
import { Equipment, FormValues } from '../../FarmerDetails/index';

interface FarmerStep5Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
  showForm2: boolean;
  setShowForm2: React.Dispatch<React.SetStateAction<boolean>>;
}
const FarmerStep5: React.FC<FarmerStep5Props> = ({
  values,
  errors,
  touched,
  setFieldValue,
  setShowForm2,
  showForm2,
}) => {
  const { data, isLoading } = useGetEquipementQuery({});
  const EquipmentList = values.Equipment || [];
  const equipement = data?.data?.data || [];
  const equipementName = isLoading
    ? ['Loading...']
    : equipement.length > 0
    ? equipement.map((e: { name: string }) => e.name)
    : ['No equipment found'];
  const equipementBrand =
    equipement.find((equipement: { name: string }) => equipement.name === values.equipment)
      ?.brand || [];
  const brandName = isLoading
    ? ['Loading...']
    : equipementBrand.length > 0
    ? equipementBrand.map((b: { brand: string }) => b.brand)
    : ['No brand found'];
  const handleSaveAnimal = () => {
    const newEquipment: Equipment = {
      equipment: values.equipment,
      equipmentQuantity: values.equipmentQuantity,
      equipmentType: values.equipmentType,
      brandName: values.brandName,
      owner: values.owner,
      breedName: values.breedName,
      onRent: values.onRent,
      insuranceCompany: values.insuranceCompany,
      equipmentDocument: values.equipmentDocument,
      equipmentImage: values.equipmentImage,
    };

    setFieldValue('Equipment', [...(values.Equipment || []), newEquipment]);
    setShowForm2(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[112px] w-full max-w-2xl rounded-[10px] md:p-8">
        <FieldArray
          name="Equipment"
          render={(arrayHelpers) => (
            <div className="bg-[radial-gradient(circle,rgba(54,195,96,0.10),white)]  to-white ">
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
                            <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <div className="text-[#005B24] font-bold text-md">{item.equipment}</div>
                          <div className="text-gray-500 text-sm">{item.brandName}</div>
                        </div>
                      </div>

                      {/* MIDDLE: Quantity */}
                      <div className="bg-white rounded-xl  px-4 ml-19 py-1 font-bold text-[#005B24] text-lg shadow border h-[36px] min-w-[45px] text-center">
                        {item.equipmentQuantity}
                      </div>

                      {/* RIGHT: Milk Info + Edit */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="bg-green-800 hover:bg-green-700 p-2 rounded-xl text-white"
                          title="Edit"
                        >
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
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Collapsible Add New Animal Section */}
              <div className="mt-[34px] max-w-md mx-auto">
                <div
                  className="flex items-center justify-between bg-[#E9F7EF] border-[2px]  border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none "
                  onClick={() => setShowForm2((prev: boolean) => !prev)}
                >
                  <span className="font-semibold text-[#005B24]">+ Add New Equipment</span>
                  <span className="text-[#005B24] text-xl">
                    {' '}
                    {showForm2 ? (
                      <img src={OpenArrow} className="w-6 h-5" alt="open arrow"></img>
                    ) : (
                      <img src={closeArrow} className="w-6 h-3" alt="close arrow"></img>
                    )}{' '}
                  </span>
                </div>
                {showForm2 && (
                  // Form to Add New Animal
                  <div className="mt-3 bg-[radial-gradient(circle,rgba(54,195,96,0.2))] rounded-[10px] p-2 shadow-md space-y-[23px]">
                    <div className="flex gap-2 h-12 ">
                      {/* animalType */}
                      <SelectInput<FormValues>
                        name="equipment"
                        options={equipementName}
                        touched={touched}
                        errors={errors}
                        width="w-[200px]"
                        height="h-[40px]"
                        defaultOption=""
                        setFieldValue={setFieldValue}
                        values={values}
                        label={''}
                        customClass={'px-4 text-sm font-semibold bg-white text-[#005B24]'}
                        labelFirst={''}
                      />

                      {/* quantity */}
                      <div className="relative flex items-center justify-center bg-white rounded-md shadow-sm w-full h-[40px] mt-2 px-3">
                        <label htmlFor="equipmentQuantity" className="text-gray-500 text-sm mr-2">
                          Quantity
                        </label>

                        <Field
                          id="equipmentQuantity"
                          name="equipmentQuantity"
                          type="number"
                          className={`w-[40px] text-[#005B24] font-bold text-center bg-transparent
                            border-b-2 text-sm outline-none border-b-gray-500
                            ${
                              touched.equipmentQuantity && errors.equipmentQuantity
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-green-600 focus:border-green-600'
                            }`}
                        />
                      </div>

                      <ErrorMessage
                        name="equipmentQuantity"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* How Much Milk Your Cows Produce? */}

                    <TextInput<FormValues>
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
                    <SelectInput<FormValues>
                      name="brandName"
                      label="Brand Name"
                      options={brandName}
                      defaultOption="Select Brand"
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      values={values}
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                      customClass="border-2"
                      width="w-full"
                      height="h-[52px]"
                      labelFirst={''}
                    />

                    {/* milk selling place */}

                    {/* Owner */}
                    <SelectInput<FormValues>
                      name="owner"
                      options={[
                        { label: 'Select Ownership Type', value: '' },
                        { label: 'Self', value: 'self' },
                        { label: 'Rented', value: 'rented' },
                        { label: 'Other', value: 'other' },
                      ]}
                      touched={touched}
                      errors={errors}
                      width="w-full"
                      height="h-[40px]"
                      defaultOption="Select Owner"
                      setFieldValue={setFieldValue}
                      values={values}
                      label="Owner"
                      customClass={'border-[2px] h-[52px]'}
                      labelcss={'px-2  bg-[radial-gradient(circle,rgba(54,195,96,0.2))] '}
                      labelFirst={''}
                    />

                    {/* breedName */}

                    <TextInput<FormValues>
                      name="breedName"
                      label="Breed Name"
                      placeholder="Enter Breed Name"
                      errors={errors}
                      touched={touched}
                      type="text"
                      setFieldValue={setFieldValue}
                      values={values}
                      labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))] '}
                    />

                    {/* onRent */}
                    <ToggleButtonGroup
                      label="On Rent?"
                      className="bg-white"
                      value={values.onRent}
                      onChange={(val) => setFieldValue('onRent', val)}
                    />

                    {/* Upload Document & Image */}
                    <div>
                      <label className="text-lg w-full text-[#005B24] font-semibold mb-1">
                        Upload Document & Image
                      </label>
                      <div className="flex w-full gap-5">
                        <div className="w-60">
                          <ImageUploadInput<FormValues>
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
                          <ImageUploadInput<FormValues>
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
                      className="w-full bg-[#005B24] h-[34px] text-white rounded-[10px] text-base font-normal"
                    >
                      {' '}
                      Save{' '}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FarmerStep5;
