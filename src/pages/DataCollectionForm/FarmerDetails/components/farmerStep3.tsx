import React from 'react';

import { ErrorMessage, Field, FieldArray } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import ToggleButtonGroup from '@/components/ui/inputs/ToggleButtonGroup';
import UnitInput from '@/components/ui/inputs/UnitInput';

import DeleteImg from '../../../../assets/Icons/delete.svg';
import milk from '../../../../assets/Icons/lucide_milk.svg';
import { Animal, FormValues } from '../../FarmerDetails/index';

interface FarmerStep3Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FarmerStep3: React.FC<FarmerStep3Props> = ({
  values,
  errors,
  touched,
  setFieldValue,
  showForm,
  setShowForm,
}) => {
  const animalList = values.animals || [];

  const handleSaveAnimal = () => {
    // Construct the new animal from form values
    const newAnimal: Animal = {
      animalType: values.animalType,
      quantity: values.quantity,
      milkProduction: values.milkProduction,
      milkSellingPlace: values.milkSellingPlace,
      breedName: values.breedName,
      insuranceAvailable: values.insuranceAvailable,
      insuranceCompany: values.insuranceCompany,
      photo: values.photo,
      milk: '',
    };
    setFieldValue('animals', [...(values.animals || []), newAnimal]);
    // Reset animal fields after save
    setShowForm(false);
    setShowForm(false); // Hide the form after saving
  };

  const animalTypes = ['Cow', 'Goat', 'Buffalo', 'Sheep', 'Others'];
  const milkSellingPlaces = ['Dairy', 'Village', 'Market', 'Co-operative', 'Others'];
  return (
    <div className="flex flex-col min-h-[70vh] items-center ">
      <div className="w-full max-w-2xl rounded-xl md:p-8">
        <div className="space-y-6">
          <FieldArray
            name="animals"
            render={(arrayHelpers) => (
              <div className="bg-[radial-gradient(circle,rgba(54,195,96,0.10),white)] to-white py-4 px-2">
                {/* Animal List */}

                {animalList.length > 0 && (
                  <div className="mb-4">
                    {animalList.map((animal, idx) => (
                      <div
                        key={idx}
                        className="flex items-center h-[53px]  justify-between bg-[rgba(54,195,96,0.2)] rounded-2xl p-1 mb-3"
                      >
                        {/* LEFT: Image + Name + Breed */}
                        <div className="flex items-center  gap-2">
                          <div className="relative w-10 h-10">
                            {animal.photo ? (
                              <img
                                src={URL.createObjectURL(animal.photo)}
                                alt="animal"
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                            {/* DELETE Button */}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(idx)}
                              className="absolute -top-2 -left-2 bg-white p-1 rounded-full shadow border border-gray-200"
                              title="Delete"
                            >
                              <img src={DeleteImg} alt="Delete" className="h-4 w-4" />
                            </button>
                          </div>
                          <div>
                            <div className="text-green-900 font-bold text-md">
                              {animal.animalType}
                            </div>
                            <div className="text-gray-500 text-sm">{animal.breedName}</div>
                          </div>
                        </div>

                        {/* MIDDLE: Quantity */}
                        <div className="bg-white rounded-md px-4 py-1 font-bold text-green-900 text-lg shadow border h-[36px] min-w-[45px] text-center">
                          {animal.quantity}
                        </div>

                        {/* RIGHT: Milk Info + Edit */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-gray-500 text-sm">
                            <img src={milk} alt="Milk Icon" className="h-4 w-4 mr-1" />
                            {animal.quantity} ltr Miilk Daily{' '}
                          </div>

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
                <div className="mb-4  max-w-md mx-auto">
                  <div
                    className=" flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none "
                    onClick={() => setShowForm((prev) => !prev)}
                  >
                    <span className="font-semibold text-green-900 text-base">+ Add New Animal</span>
                    <span className="text-green-900 text-2xl font-bold">
                      {showForm ? '▲' : '▼'}
                    </span>
                  </div>
                  {showForm && (
                    // Form to Add New Animal
                    <div className="mt-2 bg-gradient-to-r from-[#d9f3e3] to-[#e9f7ef] rounded-2xl p-2 shadow-md space-y-4">
                      <div className="flex gap-2 h-12">
                        {/* animalType */}
                        <SelectInput<FormValues>
                          name="animalType"
                          options={animalTypes}
                          touched={touched}
                          errors={errors}
                          width="w-full"
                          height="h-[40px]"
                          defaultOption="Cow / Goat etc."
                          setFieldValue={setFieldValue}
                          values={values}
                          label={''}
                          customClass={'px-4 text-sm font-semibold bg-white text-green-800'}
                          labelFirst={''}
                        />

                        {/* quantity */}
                        <Field
                          id="quantity"
                          name="quantity"
                          type="number"
                          className={`w-1/2 h-[40px] bg-white shadow-sm p-2 rounded-lg  ${
                            touched.quantity && errors.quantity
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          }`}
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      {/* How Much Milk Your Cows Produce? */}
                      <div>
                        <UnitInput<FormValues>
                          id="milkProduction"
                          name="milkProduction"
                          label="How Much Milk Your Cows Produce?"
                          type="number"
                          unit="Ltr"
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      {/* milk selling place */}
                      <div className="mt-6">
                        <SelectInput<FormValues>
                          name="milkSellingPlace"
                          options={milkSellingPlaces}
                          touched={touched}
                          errors={errors}
                          width="w-full"
                          height="h-[50px]"
                          defaultOption="Select Milk Selling Place"
                          setFieldValue={setFieldValue}
                          values={values}
                          label={'Milk Selling Place'}
                          labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.10))] '}
                          customClass={'border-2'}
                          labelFirst={''}
                        />
                        {values.milkSellingPlace && (
                          <div className="mt-4">
                            <TextInput<FormValues>
                              name={values.milkSellingPlace}
                              label={`${values.milkSellingPlace} Name`}
                              placeholder={`Enter ${values.milkSellingPlace} Name`}
                              errors={errors}
                              touched={touched}
                              type="text"
                              setFieldValue={setFieldValue}
                              values={values}
                              labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.10))] '}
                            />
                          </div>
                        )}
                      </div>
                      {/* breedName */}
                      <div className="mt-6">
                        <TextInput<FormValues>
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
                          <TextInput<FormValues>
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
                      {/* image */}
                      <ImageUploadInput<FormValues>
                        name="photo"
                        label="Animal Photo"
                        errors={errors}
                        touched={touched}
                        values={values}
                        setFieldValue={setFieldValue}
                        id="photo"
                        placeholder="Upload animal photo"
                      />
                      <button
                        onClick={handleSaveAnimal}
                        className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold"
                      >
                        {' '}
                        Save Animal{' '}
                      </button>{' '}
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

export default FarmerStep3;
