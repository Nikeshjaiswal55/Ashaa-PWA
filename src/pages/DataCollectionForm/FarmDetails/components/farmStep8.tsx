import React, { useState } from 'react';

import { Field, FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues } from '..';
import OpenArrow from '../../../../assets/Icons/OpenArrow.svg';
import closeArrow from '../../../../assets/Icons/arrow.png';
import deleteImg from '../../../../assets/Icons/delete.svg';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import TextInput from '../../../../components/ui/inputs/TextInput';

const pesticidesTypeOptions = ['Herbicide', 'Insecticide', 'Fungicide', 'Bactericide'];
const appliedStageOptions = ['Sowing', 'Vegetative', 'Flowering', 'Fruiting'];

interface FarmStep8Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}

const FarmStep8: React.FC<FarmStep8Props> = ({ values, errors, touched, setFieldValue }) => {
  const [showPesticideForm, setShowPesticideForm] = useState(true);

  const handleSavePesticide = () => {
    const pesticide = {
      pesticidesName: values.pesticidesName,
      pesticidesType: values.pesticidesType,
      pesticidesQuantity: values.pesticidesQuantity,
      pesticidesprice: values.pesticidesprice,
      pesticidescompanyName: values.pesticidescompanyName,
      pesticidesappliedRate: values.pesticidesappliedRate,
      pesticidesappliedStage: values.pesticidesappliedStage,
    };
    setFieldValue('pesticidesUsageList', [...(values.pesticidesUsageList || []), pesticide]);

    setShowPesticideForm(false);
  };

  return (
    <div className="space-y-6 mt-20">
      <FieldArray
        name="pesticidesUsageList"
        render={(arrayHelpers) => (
          <>
            {/* List */}
            {values.pesticidesUsageList && values.pesticidesUsageList.length > 0 && (
              <div className="mb-4">
                {values.pesticidesUsageList.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center bg-[radial-gradient(circle,rgba(54,195,96,0.2))] rounded-md mb-3 h-[53px] px-3"
                  >
                    {/* Left: Delete Button */}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(idx)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow border border-gray-200 flex items-center justify-center"
                      title="Delete"
                      style={{ minWidth: 24, minHeight: 24 }}
                    >
                      <img src={deleteImg} alt="Delete" className="h-4 w-4" />
                    </button>
                    {/* Name & Company */}
                    <div className="flex flex-col justify-center flex-1 min-w-0 pl-8">
                      <span className="font-semibold text-green-900 text-sm truncate">
                        {item.pesticidesName}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {item.pesticidescompanyName}
                      </span>
                    </div>
                    {/* Center: Quantity */}
                    <div className="flex items-center justify-center mx-3 min-w-[40px] h-[28px] bg-white rounded-lg border border-gray-200 font-bold text-green-900 text-base">
                      {item.pesticidesQuantity}
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
                ))}
              </div>
            )}

            {/* Add New Pesticide Button */}
            <div className="mb-4 max-w-md mx-auto">
              <div
                className="flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none"
                onClick={() => setShowPesticideForm((prev) => !prev)}
              >
                <span className="font-semibold text-green-900 text-base">
                  + Add Pesticide Usage
                </span>
                <span className="text-green-900 text-2xl font-bold">
                  {showPesticideForm ? (
                    <img src={OpenArrow} className="w-6 h-5" alt="open arrow"></img>
                  ) : (
                    <img src={closeArrow} className="w-6 h-3" alt="close arrow"></img>
                  )}
                </span>
              </div>
            </div>

            {/* Pesticide Form */}
            {showPesticideForm && (
              <div className="mt-2  rounded-2xl p-2 space-y-8 bg-[radial-gradient(circle,rgba(54,195,96,0.2))]">
                <div className="mt-4">
                  <TextInput
                    label="Pesticides Name"
                    name="pesticidesName"
                    placeholder="Enter Fertilizer Name"
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    type=""
                    labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                  />
                </div>
                <SelectInput
                  label="Pesticides Type"
                  name="pesticidesType"
                  options={pesticidesTypeOptions}
                  defaultOption="Select your Fertilizer Type"
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
                {/* Quantity */}
                <div className="flex justify-between items-center bg-white rounded-lg px-4 py-3 mb-4">
                  <div>
                    <div className="text-green-900  font-semibold text-lg">Quantity</div>
                    <div className="text-base text-gray-500 font-normal  -mt-0.5">
                      Enter quantity used
                    </div>
                  </div>
                  <Field
                    name="pesticidesQuantity"
                    type="number"
                    as="input"
                    placeholder="1000"
                    className="w-[109.43px] text-center bg-transparent text-green-900 font-bold text-lg border-b-2 border-green-700 focus:ring-0 focus:outline-none"
                    style={{ appearance: 'textfield' }}
                  />
                </div>

                {/* Price */}
                <div className="flex justify-between items-center bg-white rounded-lg px-4 py-3">
                  <div>
                    <div className="text-green-900 font-semibold text-lg">Price</div>
                    <div className="text-base text-gray-500 -mt-0.5 font-normal">Enter Price</div>
                  </div>
                  <Field
                    name="pesticidesprice"
                    type="number"
                    as="input"
                    placeholder="1000"
                    className="w-[109.43px] text-center  bg-transparent text-green-900 font-bold text-lg border-b-2 border-green-700 focus:ring-0 focus:outline-none"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
                <TextInput
                  label="Company Name"
                  name="pesticidescompanyName"
                  placeholder="Enter Fertilizer Company Name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                />
                <TextInput
                  label="Applied Rate"
                  name="pesticidesappliedRate"
                  placeholder="Enter Applied Rate"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss={'bg-[radial-gradient(circle,rgba(54,195,96,0.2))]'}
                />
                <SelectInput
                  label="Applied Stage"
                  name="pesticidesappliedStage"
                  options={appliedStageOptions}
                  defaultOption="Select your Applied Stage"
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
                <button
                  type="button"
                  className="bg-[#005B24] text-white font-semibold py-2 px-6 rounded-lg shadow-md w-full"
                  onClick={handleSavePesticide}
                >
                  Save Pesticide
                </button>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FarmStep8;
