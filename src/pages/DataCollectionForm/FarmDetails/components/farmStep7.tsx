import React, { useState } from 'react';

import { Field, FieldArray, FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues } from '..';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import TextInput from '../../../../components/ui/inputs/TextInput';

const fertilizerTypeOptions = ['Urea', 'DAP', 'MOP', 'NPK', 'Compost'];
const appliedStageOptions = ['Sowing', 'Vegetative', 'Flowering', 'Fruiting'];

interface FarmStep7Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}

const FarmStep7: React.FC<FarmStep7Props> = ({ values, errors, touched, setFieldValue }) => {
  const [showFertilizerForm, setShowFertilizerForm] = useState(false);

  // Save current fertilizer to fertilizerUsageList array
  const handleSaveFertilizer = () => {
    const fertilizer = {
      fertilizerName: values.fertilizerName,
      fertilizerType: values.fertilizerType,
      quantity: values.quantity,
      price: values.price,
      companyName: values.companyName,
      appliedRate: values.appliedRate,
      appliedStage: values.appliedStage,
    };
    setFieldValue('fertilizerUsageList', [...(values.FertilizerUsageList || []), fertilizer]);
    // Reset fields after save

    setShowFertilizerForm(false);
  };

  return (
    <div className="space-y-6">
      <FieldArray
        name="fertilizerUsageList"
        render={(arrayHelpers) => (
          <>
            {/* List */}
            {values.FertilizerUsageList && values.FertilizerUsageList.length > 0 && (
              <div className="mb-4">
                {values.FertilizerUsageList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[rgba(54,195,96,0.08)] rounded-xl p-2 mb-3"
                  >
                    <div className="flex flex-col w-full">
                      <span className="font-semibold text-green-900 text-sm">
                        {item.fertilizerName}
                      </span>
                      <span className="text-xs text-gray-600">
                        Type: <span className="font-medium">{item.fertilizerType}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        Qty: <span className="font-medium">{item.quantity}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        Price: <span className="font-medium">{item.price}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        Company: <span className="font-medium">{item.companyName}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        Applied Rate: <span className="font-medium">{item.appliedRate}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        Stage: <span className="font-medium">{item.appliedStage}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(idx)}
                      className="ml-2 bg-white p-1 rounded-full shadow border border-gray-200"
                      title="Delete"
                    >
                      <span className="text-red-500 font-bold">×</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Fertilizer Button */}
            <div className="mb-4 max-w-md mx-auto">
              <div
                className="flex items-center justify-between bg-[#E9F7EF] border-2 border-dashed border-[#005B24] px-5 py-3 rounded-xl h-[43px] cursor-pointer select-none transition-all duration-150 shadow-none"
                onClick={() => setShowFertilizerForm((prev) => !prev)}
              >
                <span className="font-semibold text-green-900 text-base">
                  + Add Fertilizer Usage
                </span>
                <span className="text-green-900 text-2xl font-bold">
                  {showFertilizerForm ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Fertilizer Form */}
            {showFertilizerForm && (
              <div className="mt-2 bg-gradient-to-r mx-2 from-[#d9f3e3] to-[#e9f7ef] rounded-2xl p-2 shadow-md space-y-6">
                <TextInput
                  label="Fertilizer Name"
                  name="fertilizerName"
                  placeholder="Enter Fertilizer Name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <SelectInput
                  label="Fertilizer Type"
                  name="fertilizerType"
                  options={fertilizerTypeOptions}
                  defaultOption="Select your Fertilizer Type"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  customClass="border-2"
                  width="w-full"
                  height="h-[52px]"
                  labelFirst=""
                />
                {/* Quantity */}
                <div>
                  <label className="block text-green-900 font-semibold mb-1">Quantity</label>
                  <span className="text-xs text-gray-500">Enter quantity used</span>
                  <div className="flex items-center bg-[rgba(54,195,96,0.08)] rounded-lg px-4 py-3 mt-1">
                    <Field
                      name="quantity"
                      type="number"
                      as="input"
                      placeholder="1000"
                      className="w-full text-right bg-transparent text-green-900 font-bold text-lg border-b-2 border-green-700 focus:ring-0 focus:outline-none"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
                {/* Price */}
                <div>
                  <label className="block text-green-900 font-semibold mb-1">Price</label>
                  <span className="text-xs text-gray-500">Enter Price</span>
                  <div className="flex items-center bg-[rgba(54,195,96,0.08)] rounded-lg px-4 py-3 mt-1">
                    <Field
                      name="price"
                      type="number"
                      as="input"
                      placeholder="1000"
                      className="w-full text-right bg-transparent text-green-900 font-bold text-lg border-b-2 border-green-700 focus:ring-0 focus:outline-none"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
                <TextInput
                  label="Company Name"
                  name="companyName"
                  placeholder="Enter Fertilizer Company Name"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <TextInput
                  label="Applied Rate"
                  name="appliedRate"
                  placeholder="Enter Applied Rate"
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type=""
                  labelcss=""
                />
                <SelectInput
                  label="Applied Stage"
                  name="appliedStage"
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
                />
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md w-full"
                  onClick={handleSaveFertilizer}
                >
                  Save Fertilizer
                </button>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FarmStep7;
