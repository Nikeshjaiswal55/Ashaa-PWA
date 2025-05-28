import React, { useState } from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

// --- Icon Types (Optional but good practice) ---
interface IconProps {
  className?: string;
}

// --- Icons ---
const BackArrowIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const UploadIcon: React.FC<IconProps> = ({ className = 'w-8 h-8 text-gray-400' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z"
    />
  </svg>
);

const ArrowRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 ml-1' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// --- Form Values Interface ---
interface FormValues {
  farmerName: string;
  contactNumber: string;
  aadharCardNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  totalFarmSize: string; // Kept as string for input, Yup handles number conversion
  farmSizeUnit: 'Acre' | 'Hectare' | 'Bigha';
  separateFarms: string; // Kept as string for input
  state: string;
  district: string;
  subDistrict: string;
  pinCode: string;
  village: string;
  farmerPhoto: File | null;
}

// --- Main Form Component ---
const FarmerDetailsForm: React.FC = () => {
  const initialValues: FormValues = {
    farmerName: '',
    contactNumber: '',
    aadharCardNumber: '',
    gender: 'Male',
    totalFarmSize: '',
    farmSizeUnit: 'Acre',
    separateFarms: '3', // Default as string to match input type
    state: '',
    district: '',
    subDistrict: '',
    pinCode: '',
    village: '',
    farmerPhoto: null,
  };

  // Basic validation schema (can be expanded)
  const validationSchema = Yup.object().shape({
    farmerName: Yup.string().required("Farmer's full name is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
      .required('Contact number is required'),
    aadharCardNumber: Yup.string()
      .matches(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/, 'Enter a valid Aadhar number (XXXX-XXXX-XXXX)')
      .required('Aadhar card number is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Other'] as const)
      .required('Gender is required'),
    totalFarmSize: Yup.number()
      .typeError('Farm size must be a number')
      .positive('Farm size must be positive')
      .required('Total farm size is required'),
    farmSizeUnit: Yup.string()
      .oneOf(['Acre', 'Hectare', 'Bigha'] as const)
      .required('Unit is required'),
    separateFarms: Yup.number()
      .typeError('Number of farms must be a number')
      .integer('Must be an integer')
      .min(0, 'Cannot be negative')
      .required('Number of separate farms is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    subDistrict: Yup.string().required('Sub-District/Block is required'),
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Enter a valid 6-digit pin code')
      .required('Pin code is required'),
    village: Yup.string().required('Village is required'),
    farmerPhoto: Yup.mixed().nullable(), // Allow null, add .required() if mandatory
    // .test(
    //   "fileSize",
    //   "File too large, max 10MB",
    //   value => !value || (value && value.size <= 1024 * 1024 * 10) // 10MB
    // )
    // .test(
    //   "fileType",
    //   "Unsupported file format",
    //   value => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    // ),
  });

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log('Form Data:', values);
    // Handle form submission (e.g., API call)
    // For farmerPhoto, you'd typically use FormData:
    // const formData = new FormData();
    // Object.keys(values).forEach(key => {
    //   const formKey = key as keyof FormValues;
    //   if (formKey === 'farmerPhoto' && values[formKey]) {
    //     formData.append(formKey, values[formKey] as File, (values[formKey] as File).name);
    //   } else {
    //     formData.append(formKey, String(values[formKey]));
    //   }
    // });
    // console.log('FormData for submission:', formData);

    // Using window.alert is generally discouraged in React apps.
    // Consider using a modal or a notification component.
    // For now, to avoid breaking changes if this code is run in an environment
    // where `alert` is polyfilled or handled differently (like a custom modal):
    try {
      alert('Form submitted! Check the console for data.');
    } catch (e) {
      console.warn('`alert` failed, likely due to iframe restrictions. Form data:', values);
      // Implement a custom modal/notification here as a fallback
      const submissionMessage = document.createElement('div');
      submissionMessage.textContent =
        'Form submitted! Check the console for data. (Custom fallback message)';
      submissionMessage.style.position = 'fixed';
      submissionMessage.style.top = '20px';
      submissionMessage.style.left = '50%';
      submissionMessage.style.transform = 'translateX(-50%)';
      submissionMessage.style.padding = '10px 20px';
      submissionMessage.style.backgroundColor = 'lightgreen';
      submissionMessage.style.border = '1px solid green';
      submissionMessage.style.borderRadius = '5px';
      submissionMessage.style.zIndex = '1000';
      document.body.appendChild(submissionMessage);
      setTimeout(() => {
        document.body.removeChild(submissionMessage);
      }, 3000);
    }
    setSubmitting(false);
  };

  const [activeStep] = useState<number>(1); // For the progress indicator

  // Dummy data for dropdowns
  const states: string[] = [
    'Select your state',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
  ];
  const districts: string[] = [
    'Select your district',
    'Pune',
    'Mumbai',
    'Bangalore Rural',
    'Chennai',
  ];
  const subDistricts: string[] = ['Select Block', 'Haveli', 'Khed', 'Hosakote', 'Sriperumbudur'];
  const farmUnits: FormValues['farmSizeUnit'][] = ['Acre', 'Hectare', 'Bigha'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl md:p-8">
        {/* Header */}

        <div className="flex items-center mb-6">
          <button type="button" className="text-gray-600 hover:text-green-600 transition-colors">
            <BackArrowIcon />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-4">Farmer Details</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    activeStep === step
                      ? 'bg-green-500 text-white ring-2 ring-green-300 ring-offset-1'
                      : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {step}
              </div>
              {step < 6 && <div className="flex-1 h-0.5 bg-gray-200 last:hidden"></div>}
            </React.Fragment>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form className="space-y-6">
              {/* Farmer Name */}
              <div className="relative">
                <label
                  htmlFor="farmerName"
                  className="absolute bg-white  text-green-900 top-[-15px] left-3 block text-lg font-semibold px-2 text-gray-700 mb-1"
                >
                  Farmer Name
                </label>
                <Field
                  type="text"
                  name="farmerName"
                  id="farmerName"
                  placeholder="Enter farmer's full name"
                  className={`w-full border-2 border-green-800 p-3 border rounded-lg shadow-sm transition-colors
                    ${
                      touched.farmerName && errors.farmerName
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="farmerName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Contact Number */}
              <div className="relative">
                <label
                  htmlFor="contactNumber"
                  className="absolute bg-white text-green-900 top-[-15px] left-3 block text-lg px-2 font-semibold text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <Field
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Enter mobile number"
                  className={`w-full p-3 border rounded-lg shadow-sm transition-colors border-2 border-green-800
                    ${
                      touched.contactNumber && errors.contactNumber
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Aadhar Card Number */}
              <div className="relative">
                <label
                  htmlFor="aadharCardNumber"
                  className="absolute bg-white text-green-900 top-[-15px] left-3  block text-lg font-semibold px-2 text-gray-700 mb-1 "
                >
                  Aadhar Card Number
                </label>
                <Field
                  type="text"
                  name="aadharCardNumber"
                  id="aadharCardNumber"
                  placeholder="XXXX-XXXX-XXXX"
                  className={`w-full border-2 border-green-800 p-3 border rounded-lg shadow-sm transition-colors
                    ${
                      touched.aadharCardNumber && errors.aadharCardNumber
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="aadharCardNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-lg font-semibold text-green-900 mb-2">Gender</label>
                <div
                  role="group"
                  aria-labelledby="gender-group"
                  className="flex justify-between gap-3"
                >
                  {(['Male', 'Female', 'Other'] as FormValues['gender'][]).map((genderOption) => (
                    <label
                      key={genderOption}
                      className={`flex items-center w-[124px] h-[25px]  px-4 py-1 rounded-lg shadow-sm cursor-pointer transition-all duration-150 ease-in-out
                        ${
                          values.gender === genderOption
                            ? 'bg-green-100'
                            : 'bg-gray-300 hover:bg-gray-200'
                        }`}
                    >
                      <Field
                        type="radio"
                        name="gender"
                        value={genderOption}
                        className="accent-green-600"
                      />
                      <span className="text-lg font-semibold text-green-900 pl-2">
                        {genderOption}
                      </span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Total Farm Size & Unit */}
              <div className="grid grid-cols-3 gap-4 items-end">
                {/* Input Field */}
                <div className="col-span-2">
                  <label
                    htmlFor="totalFarmSize"
                    className="block text-sm font-semibold text-green-900 mb-1"
                  >
                    Total Farm Size
                  </label>
                  <Field
                    type="number"
                    name="totalFarmSize"
                    id="totalFarmSize"
                    placeholder="Enter your Farm Size"
                    className={`w-full px-4 py-2 bg-gray-200 text-sm rounded-lg shadow-sm focus:outline-none 
        ${
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

                {/* Select Dropdown */}
                <div>
                  <Field
                    as="select"
                    name="farmSizeUnit"
                    id="farmSizeUnit"
                    className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none text-green-900
        ${touched.farmSizeUnit && errors.farmSizeUnit ? 'border-red-500' : 'border-green-800'}`}
                  >
                    {farmUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="farmSizeUnit"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* No. of Separate Farms */}
              <div>
                <label
                  htmlFor="separateFarms"
                  className="block text-lg font-semibold text-green-900 mb-1"
                >
                  No. of Separate Farms
                </label>
                <div className="flex items-center bg-green-50 h-[53px] p-3 rounded-lg border border-green-200 shadow-sm">
                  <span className="text-lg font-semibold text-green-800 flex-grow">
                    Number of farms
                  </span>
                  <Field
                    type="number"
                    name="separateFarms"
                    id="separateFarms"
                    className={`w-20 p-2  bg-white rounded-md h-[42px]  text-center shadow-sm transition-colors
                      ${
                        touched.separateFarms && errors.separateFarms
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                  />
                </div>
                <ErrorMessage
                  name="separateFarms"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex ">
                  <div className="flex-1">
                    <label
                      htmlFor="state"
                      className="block text-lg font-semibold text-green-900 mb-1"
                    >
                      State
                    </label>
                    <Field
                      as="select"
                      name="state"
                      id="state"
                      className={`w-[165px] h-[52px] p-3 border-2 border-green-800 rounded-lg shadow-sm bg-gray-50 transition-colors
                      ${
                        touched.state && errors.state
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                    >
                      {states.map((s) => (
                        <option key={s} value={s === 'Select your state' ? '' : s}>
                          {s}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="district"
                      className="block text-lg font-semibold text-green-900 mb-1"
                    >
                      District
                    </label>
                    <Field
                      as="select"
                      name="district"
                      id="district"
                      className={`w-[165px] h-[52px] w-full p-3 border-2 rounded-lg shadow-sm border-green-800 bg-gray-50 transition-colors w-[160px] h-[52px]
                      ${
                        touched.district && errors.district
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                    >
                      {districts.map((d) => (
                        <option key={d} value={d === 'Select your district' ? '' : d}>
                          {d}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="district"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Sub-District & Pin code */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex">
                  <div className="flex-1">
                    <label
                      htmlFor="subDistrict"
                      className="block text-lg font-semibold text-green-900 mb-1"
                    >
                      Sub-District
                    </label>
                    <Field
                      as="select"
                      name="subDistrict"
                      id="subDistrict"
                      className={`w-full p-3 border-2 border-green-800  h-[52px] rounded-lg shadow-sm bg-gray-50 transition-colors
                      ${
                        touched.subDistrict && errors.subDistrict
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                    >
                      {subDistricts.map((sd) => (
                        <option key={sd} value={sd === 'Select Block' ? '' : sd}>
                          {sd}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="subDistrict"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="pinCode"
                      className="block text-lg font-semibold text-green-800 mb-1"
                    >
                      Pin Code
                    </label>
                    <Field
                      type="text"
                      name="pinCode"
                      id="pinCode"
                      placeholder="Enter 6-digit pin code"
                      className={`w-full p-3 border-2 border-green-800  h-[52px] rounded-lg shadow-sm transition-colors
                      ${
                        touched.pinCode && errors.pinCode
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                    />
                    <ErrorMessage
                      name="pinCode"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Village */}
              <div>
                <label
                  htmlFor="village"
                  className="block text-lg font-semibold text-green-800 mb-1"
                >
                  Village
                </label>
                <Field
                  type="text"
                  name="village"
                  id="village"
                  placeholder="Enter village name"
                  className={`w-full p-3 border rounded-lg shadow-sm transition-colors
                    ${
                      touched.village && errors.village
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="village"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Farmer Photo Upload */}
              <div>
                <label className="block text-lg font-semibold text-green-800 mb-2">
                  Farmer Photo
                </label>
                <div
                  className={`flex justify-center items-center w-full h-[81px] border-2 border-dashed rounded-lg cursor-pointer transition-colors
                    ${
                      touched.farmerPhoto && errors.farmerPhoto
                        ? 'border-red-400 bg-red-50 hover:bg-red-100'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  onClick={() => document.getElementById('farmerPhoto')?.click()}
                >
                  <input
                    type="file"
                    name="farmerPhoto"
                    id="farmerPhoto"
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => {
                      setFieldValue(
                        'farmerPhoto',
                        event.currentTarget.files ? event.currentTarget.files[0] : null,
                      );
                    }}
                  />
                  {values.farmerPhoto ? (
                    <img
                      src={URL.createObjectURL(values.farmerPhoto)}
                      alt="Farmer preview"
                      className="h-full w-auto object-contain rounded-md"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                      <UploadIcon className="h-6 w-6 text-gray-400" />
                      <p className="mt-1 text-sm text-green-600">Upload farmer image</p>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="farmerPhoto"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Save & Continue
                    <ArrowRightIcon />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FarmerDetailsForm;
