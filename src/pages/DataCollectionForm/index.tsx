import React, { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import FarmerStep1 from './components/farmerStep1';
import FarmerStep2 from './components/farmerStep2';
import FarmerStep3 from './components/farmerStep3';
import FarmerStep4 from './components/farmerStep4';

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

// const UploadIcon: React.FC<IconProps> = ({ className = 'w-8 h-8 text-gray-400' }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z"
//     />
//   </svg>
// );

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
  milkSellingPlace: string;
  breedName: string;
  insuranceAvailable: boolean;
  insuranceCompany: string;
  photo: File | null;

  // Step 4
  equipmentType?: string;
  brandName?: string;
  owner?: string;
  condition?: 'Good' | 'Moderate' | 'Poor';
  onRent?: boolean;
  document?: File | null;
  image?: File | null;
  Quantity?: number;
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
  const [step, setStep] = useState(3);
  const SUPPORTED_FORMATS = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    // add more formats if needed
  ];

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

    // step 3
    animalType: 'Cow / Goat etc.',
    milkProduction: 3,
    milkSellingPlace: '',
    breedName: '',
    insuranceAvailable: true,
    insuranceCompany: '',
    quantity: 3,
    photo: null,

    // step 4
    brandName: '',
    owner: '',
    condition: 'Good',
    onRent: false,
    Quantity: 1,
    document: null,
    image: null,
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
      farmerVideo: Yup.mixed()
        .required('Farmer video is required')
        .test(
          'fileType',
          'Unsupported file format',
          (value) => value && SUPPORTED_FORMATS.includes((value as File).type),
        )
        .test('fileSize', 'File too large. Max size is 50MB', (value) => {
          if (!value || !(value instanceof FileList) || value.length === 0) return true; // skip if empty
          return value[0].size <= 50 * 1024 * 1024;
        }), // .test(
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
      equipmentType: Yup.string().required('Equipment type is required'),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
        .min(1, 'Minimum 1 required'),
      brandName: Yup.string().required('Brand name is required'),
      owner: Yup.string().required('Owner is required'),
      condition: Yup.string().oneOf(['Good', 'Moderate', 'Poor']).required('Condition is required'),
      onRent: Yup.boolean().required(),
      document: Yup.mixed().nullable(),
    }),
  ];

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log('Form Data:', values);

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
    if (step < validationSchemaArray.length) {
      setStep((prev) => prev + 1); // Move to next step
    } else {
      console.log('All steps done, final submission.');
      // You can send final API call here
    }

    setSubmitting(false);
  };

  // Dummy data for dropdowns

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl md:p-8">
        {/* Header */}

        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-1 sm:space-x-1 mb-8">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-sm font-semibold
          ${
            s <= step
              ? 'bg-[#005B24] text-white ring-2 ring-green-300 ring-offset-1'
              : 'bg-gray-400 text-white'
          }`}
              >
                {s}
              </div>
              {s < 6 && (
                <div className={`flex-1 h-0.5 ${s < step ? 'bg-green-600' : 'bg-gray-500'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center mb-6">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className=" text-green-800  rounded">
              <BackArrowIcon></BackArrowIcon>
            </button>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-4">Farmer Details</h1>
        </div>
        <h3 className="text-center">{HeaderData[step - 1]}</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaArray[step - 1]}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form className="space-y-6">
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
