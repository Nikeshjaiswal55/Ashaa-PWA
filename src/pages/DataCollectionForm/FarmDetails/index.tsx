import React, { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import image from '../../../assets/header/image.png';
// forms import
import FarmStep1 from './components/farmStep1';
import FarmStep2 from './components/farmStep2';
import FarmStep3 from './components/farmStep3';
import FarmStep4 from './components/farmStep4';
import FarmStep5 from './components/farmStep5';

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
    {' '}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />{' '}
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
    {' '}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />{' '}
  </svg>
);

// --- Equipment Interface ---
export interface waterManagement {
  waterSource: string;
  waterSourcePhoto: File | null;
  waterRetentionCapacity: string;
  drainageQuality: string;
}

// --- Form Values Interface ---
export interface FarmFormValues {
  individualFarmSize: string;
  farmSizeUnit: string;
  farmLocation: string;
  khasraNumber: string;
  landOwnership: string;
  ownerName: string;
  topography: string;

  // Step 2
  irrigationMethod: string;
  hasKCC: boolean;
  loanApproved: boolean;
  laborAvailability: string;
  hiredLaborPayment: string;
  farmingApproach: string;
  croppingPattern: string;
  primaryMarket: string;

  //step-3
  soilType: string;
  soilPhoto: File | null;
  soilTestingReportAvailable: boolean;
  soilTestingReport: File | null;

  //   step 4
  waterSource: string;
  waterSourcePhoto: File | null;
  waterRetentionCapacity: string;
  waterManagement: waterManagement[];
  drainageQuality: string;

  // step-5
  farmerPhoto: File | null;
  farmPhoto: File | null;
}

const HeaderData = [
  'Farm Details I',
  'Farm Details II',
  'Soil Management',
  'Water Management',
  'Farmer & Farm Photos',
  'Crops Details',
  'Fertilizer Usage',
  'Pesticides Usage',
];

// --- Main Form Component ---
export const FarmerDetailsForm: React.FC = () => {
  const [step, setStep] = useState(3);
  const [showWaterManagementForm, setShowWaterManagementForm] = useState(false); //for show or hide water management form step 4
  // --- Initial Form Values ---
  const initialValues: FarmFormValues = {
    individualFarmSize: '',
    farmSizeUnit: 'Acre',
    farmLocation: '',
    khasraNumber: '',
    landOwnership: '',
    ownerName: '',
    topography: '',

    // Step 2
    irrigationMethod: 'Drip',
    hasKCC: true,
    loanApproved: true,
    laborAvailability: 'Family',
    hiredLaborPayment: '',
    farmingApproach: '',
    croppingPattern: '',
    primaryMarket: 'Mandi',

    // step-3
    soilType: '',
    soilPhoto: null,
    soilTestingReportAvailable: false,
    soilTestingReport: null,

    // step 4
    waterManagement: [],
    waterSource: '',
    waterSourcePhoto: null,
    waterRetentionCapacity: '',
    drainageQuality: '',

    // step-5
    farmerPhoto: null,
    farmPhoto: null,
  };

  const validationSchemaArray = [
    Yup.object().shape({
      individualFarmSize: Yup.string().required('Farm size is required'),
      farmSizeUnit: Yup.string().required('Unit is required'),
      farmLocation: Yup.string().required('Farm location is required'),
      khasraNumber: Yup.string().required('Khasra/Survey number is required'),
      landOwnership: Yup.string().required('Land ownership is required'),
      ownerName: Yup.string().required('Owner name is required'),
      topography: Yup.string().required('Topography is required'),
    }),
    //step-2 form validation
    Yup.object().shape({
      irrigationMethod: Yup.string().required('Irrigation method is required'),
      hasKCC: Yup.boolean().required(),
      loanApproved: Yup.boolean().required(),
      laborAvailability: Yup.string().required('Labor availability is required'),
      hiredLaborPayment: Yup.string().when('laborAvailability', {
        is: 'Hired',
        then: (schema) => schema.required('Hired labor payment is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
      farmingApproach: Yup.string().required('Farming approach is required'),
      croppingPattern: Yup.string().required('Cropping pattern is required'),
      primaryMarket: Yup.string().required('Primary market is required'),
    }),

    // step-3 form validation
    Yup.object().shape({
      soilType: Yup.string().required('Soil type is required'),
      soilTestingReportAvailable: Yup.boolean().required(),
      soilTestingReport: Yup.mixed().when('soilTestingReportAvailable', {
        is: true,
        then: (schema) =>
          schema
            .required('Soil testing report is required')
            .test(
              'fileType',
              'Only PDF or image files are allowed',
              (value) =>
                !value ||
                (typeof value === 'object' &&
                  value !== null &&
                  'type' in value &&
                  typeof (value as { type?: string }).type === 'string' &&
                  ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'].includes(
                    (value as { type: string }).type,
                  )),
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    // step 4
    Yup.object().shape({
      waterSource: Yup.string().required('Water source is required'),
      waterSourcePhoto: Yup.mixed()
        .required('Water source photo is required')
        .test(
          'fileType',
          'Only image files are allowed',
          (value) =>
            !value ||
            (typeof value === 'object' &&
              value !== null &&
              'type' in value &&
              typeof (value as { type?: string }).type === 'string' &&
              ['image/jpeg', 'image/png', 'image/gif'].includes((value as { type: string }).type)),
        ),
      waterRetentionCapacity: Yup.string().required('Water retention capacity is required'),
      drainageQuality: Yup.string().required('Drainage quality is required'),
    }),

    // step 5
    Yup.object().shape({}),

    //step-6
    Yup.object().shape({}),
  ];

  const handleSubmit = (
    values: FarmFormValues,
    { setSubmitting }: FormikHelpers<FarmFormValues>,
  ) => {
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
      console.log(values);
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
                <FarmStep1
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 2 && (
                <FarmStep2
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 3 && (
                <FarmStep3
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 4 && (
                <FarmStep4
                  values={values}
                  errors={errors}
                  touched={touched}
                  showWaterManagementForm={showWaterManagementForm}
                  setShowWaterManagementForm={setShowWaterManagementForm}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 5 && (
                <FarmStep5
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
