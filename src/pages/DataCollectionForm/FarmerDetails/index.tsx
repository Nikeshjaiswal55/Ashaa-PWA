import React, { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import image from '../../../assets/header/image.png';
import FarmerStep1 from './components/farmerStep1';
import FarmerStep2 from './components/farmerStep2';
import FarmerStep3 from './components/farmerStep3';
import FarmerStep4 from './components/farmerStep4';
import FarmerStep5 from './components/farmerStep5';
import FarmerStep6 from './components/farmerStep6';

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

// --- Animal Interface ---
export interface Animal {
  milk: string;
  animalType: string;
  quantity: number;
  milkProduction: number;
  milkSellingPlace: string;
  breedName: string;
  insuranceAvailable: boolean;
  insuranceCompany: string;
  photo: File | null;
}

// --- Equipment Interface ---
export interface Equipment {
  equipment: string;
  equipmentQuantity: number;
  equipmentType: string;
  brandName: string;
  owner: string;
  breedName: string;
  insuranceAvailable: boolean;
  insuranceCompany?: string;
  equipmentDocument: File | null;
  equipmentImage: File | null;
}

// --- Form Values Interface ---
export interface FormValues {
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
  //step 2
  yearsOfExperience: string;
  Certification: string;
  farmerVideo: File | null;
  CertificateImage: File | null;
  awards: string;
  // steps 3
  animalType: string;
  quantity: number;
  milkProduction: number;
  animals: Animal[];
  milkSellingPlace: string;
  breedName: string;
  insuranceAvailable: boolean;
  insuranceCompany: string;
  photo: File | null;
  awardImage: File | null;

  // step 4
  storageType: string;
  warehouseName: string;
  warehouseLocation: string;
  capacity: string;
  capacityUnit: string;

  condition: 'Good' | 'Moderate' | 'Poor';
  storagePhoto: File | null;

  // step 5
  equipment: string;
  equipmentQuantity: number;
  equipmentType: string;
  brandName: string;
  owner: string;
  Equipment: Equipment[];
  cheak: 'Good' | 'Moderate' | 'Poor';
  onRent: boolean;
  equipmentDocument: File | null;
  equipmentImage: File | null;

  // step 6
  smartphoneOwnership: boolean;
  internetAccess: string;
  ownedBy: string;
  farmSoftwareUsed: boolean;
  appName: string;
}

const HeaderData = [
  'Farmer Details',
  'Farming Experience',
  'Livestock',
  'Storage Facilities',
  'Equipment Details',
  'Equipment Details',
  'Technology Access',
];

// --- Main Form Component ---
export const FarmerDetailsForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false); // for step 3 component
  const [showForm2, setShowForm2] = useState(false); // for step 5 component

  const [step, setStep] = useState(4);

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
    yearsOfExperience: '',
    Certification: '',
    awards: '',
    farmerVideo: null,
    CertificateImage: null,
    awardImage: null,

    // step 3
    animalType: 'Cow / Goat etc.',
    milkProduction: 3,
    milkSellingPlace: '',
    breedName: '',
    insuranceAvailable: true,
    insuranceCompany: '',
    quantity: 3,
    animals: [],
    photo: null,

    // step 4
    storageType: '',
    warehouseName: '',
    warehouseLocation: '',
    capacity: '',
    capacityUnit: 'Quintals',
    condition: 'Good',
    storagePhoto: null,

    // step 5
    equipment: 'Tractor',
    equipmentQuantity: 3,
    equipmentType: '',
    brandName: '',
    owner: '',
    cheak: 'Good',
    Equipment: [],
    onRent: true,
    equipmentDocument: null,
    equipmentImage: null,

    //  stepx-6
    smartphoneOwnership: false,
    internetAccess: '',
    ownedBy: '',
    farmSoftwareUsed: false,
    appName: '',
  };

  const validationSchemaArray = [
    Yup.object().shape({
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
    }),
    //step-2 form validation
    Yup.object().shape({
      yearsOfExperience: Yup.number()
        .typeError('Must be a number')
        .required('This field is required')
        .min(0, 'Experience cannot be negative')
        .max(100, 'Too much experience'),
      awards: Yup.string(),
      Certification: Yup.string().max(100, 'Too long').nullable(),
      // CertificateImage: Yup.mixed().nullable(), // Allow null, add .required() if mandatory
    }),

    // step-3 form validation
    Yup.object().shape({
      animalType: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      milkProduction: Yup.number().required('Required'),
      milkSellingPlace: Yup.string().required('Required'),
      breedName: Yup.string().required('Required'),
      insuranceAvailable: Yup.boolean().required('Required'),
      insuranceCompany: Yup.string().when('insuranceAvailable', {
        is: true,
        then: (schema) => schema.required('Required'),
      }),
    }),

    // step 4
    Yup.object().shape({
      storageType: Yup.string().required('Storage Facilities Type is required'),
      warehouseName: Yup.string().required('Warehouse Name is required'),
      warehouseLocation: Yup.string().required('Warehouse Location is required'),
      capacity: Yup.number()
        .typeError('Capacity must be a number')
        .required('Capacity is required')
        .min(1, 'Minimum 1 required'),
      capacityUnit: Yup.string().required('Unit is required'),
      condition: Yup.string().oneOf(['Good', 'Moderate', 'Poor']).required('Condition is required'),
      storagePhoto: Yup.mixed().nullable().required('Photo is required'),
    }),

    // step 5
    Yup.object().shape({
      equipment: Yup.string().required('Required'),
      equipmentQuantity: Yup.number().min(1, 'Minimum 1').required('Required'),
      equipmentType: Yup.string().required('Required'),
      brandName: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
      cheak: Yup.string().oneOf(['Good', 'Moderate', 'Poor']).required('Required'),
      onRent: Yup.boolean().required('Required'),
      equipmentDocument: Yup.mixed().nullable(),
      equipmentImage: Yup.mixed().nullable(),
    }),

    //step-6
    Yup.object().shape({
      smartphoneOwnership: Yup.boolean().required('Required'),
      internetAccess: Yup.string().required('Please select internet access'),
      ownedBy: Yup.string().required('Please select owner'),
      farmSoftwareUsed: Yup.boolean().required('Required'),
      appName: Yup.string().when('farmSoftwareUsed', {
        is: true,
        then: (schema) => schema.required('App Name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  ];

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log('Form Data:', values);
    // Simulate form submission
    try {
      alert('Form submitted! Check the console for data.');
    } catch (e) {
      console.warn('`alert` failed, likely due to iframe restrictions. Form data:', values);
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
    if (step < validationSchemaArray.length) {
      setStep((prev) => prev + 1); // Move to next step
    } else {
      console.log('All steps done, final submission.');
      // You can send final API call here
    }

    setSubmitting(false);
  };

  // --- Render  form---
  return (
    <div
      className="flex flex-col items-center   p-4"
      style={{
        backgroundImage: `
      radial-gradient(circle at top right, rgba(0, 91, 36, 0.73) 0%, rgba(255, 255, 255, 0) 10%),
      url(${image})
    `,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundPosition: 'top left',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Background gradient with image */}

      <div className="w-full max-w-2xl rounded-xl md:p-8">
        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-0 sm:space-x-0 mb-5">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-sm font-semibold ${
                  s <= step ? 'bg-[#005B24] text-white ' : 'bg-gray-400 text-white'
                }`}
              >
                {s}
              </div>
              {s < 6 && (
                <div
                  className={`h-0.5 w-4 sm:w-6 ${s < step ? 'bg-green-600' : 'bg-gray-500'}`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* back button */}
        <div className="flex items-center mb-0">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-green-900 border-2 border-green-900  rounded-full"
            >
              <BackArrowIcon />
            </button>
          )}

          <h1
            className={`text-3xl sm:text-2xl md:text-3xl font-semibold ${
              step < 2 ? 'ml-20' : 'ml-13'
            }`}
            style={{ color: '#005B24' }}
          >
            Farmer Details
          </h1>
        </div>
        <h3 className="text-center">{HeaderData[step - 1]}</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaArray[step - 1]}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form className="space-y-6  mt-8">
              {step === 1 && (
                <FarmerStep1
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 2 && (
                <FarmerStep2
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 3 && (
                <FarmerStep3
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
              )}

              {step === 4 && (
                <FarmerStep4
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 5 && (
                <FarmerStep5
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  showForm2={showForm2}
                  setShowForm2={setShowForm2}
                />
              )}
              {step === 6 && (
                <FarmerStep6
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {/* Submit Button */}
              <div className="flex justify-evenly bottom-5  bottom-0 left-0 w-full   w-full  h-[50px] space-x-4">
                {/* Draft Button */}
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 w-[90px] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none"
                  onClick={() => {
                    // Handle draft logic
                    console.log('Save as Draft');
                  }}
                >
                  Draft
                </button>

                {/* Next Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center bg-green-900 w-[250px]  hover:bg-green-900 text-white text-center font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          strokeWidth="2"
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
                      {step < validationSchemaArray.length ? 'Next Step' : 'Submit'}
                      <ArrowRightIcon className=" w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FarmerDetailsForm;
