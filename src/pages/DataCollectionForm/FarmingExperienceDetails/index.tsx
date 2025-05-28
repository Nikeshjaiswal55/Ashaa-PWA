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
  yearsOfExperience: string;
  Certification: string;
  aadharCardNumber: string;
  farmerVideo: File | null;
  CertificateImage: File | null;
  awards: string;
}

// --- Main Form Component ---
const FarmingExperienceDetails: React.FC = () => {
  const SUPPORTED_FORMATS = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];

  const initialValues: FormValues = {
    yearsOfExperience: '',
    Certification: '',
    awards: '',
    aadharCardNumber: '',
    farmerVideo: null,
    CertificateImage: null,
  };

  // Basic validation schema (can be expanded)
  const validationSchema = Yup.object().shape({
    yearsOfExperience: Yup.number()
      .typeError('Must be a number')
      .required('This field is required')
      .min(0, 'Experience cannot be negative')
      .max(100, 'Too much experience'),
    awards: Yup.string(),
    Certification: Yup.string().max(100, 'Too long').nullable(),
    aadharCardNumber: Yup.string()
      .matches(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/, 'Enter a valid Aadhar number (XXXX-XXXX-XXXX)')
      .required('Aadhar card number is required'),

    totalFarmSize: Yup.number()
      .typeError('Farm size must be a number')
      .positive('Farm size must be positive')
      .required('Total farm size is required'),
    farmSizeUnit: Yup.string()
      .oneOf(['Acre', 'Hectare', 'Bigha'] as const)
      .required('Unit is required'),

    CertificateImage: Yup.mixed().nullable(), // Allow null, add .required() if mandatory

    farmerVideo: Yup.mixed()
      .required('Farmer video is required')
      .test(
        'fileType',
        'Unsupported file format',
        (value) => value && SUPPORTED_FORMATS.includes((value as File).type),
      )
      .test(
        'fileSize',
        'File too large. Max size is 50MB',
        (value) => value && (value as FileList)[0].size <= 50 * 1024 * 1024,
      ), // .test(
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
                  htmlFor="yearsOfExperience"
                  className="absolute bg-white  text-green-900 top-[-15px] left-3 block text-lg font-semibold px-2 text-gray-700 mb-1"
                >
                  Years of Farming Experience
                </label>
                <Field
                  type="text"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  placeholder="Enter number of years"
                  className={`w-full border-2 border-green-800 p-3 border rounded-lg shadow-sm transition-colors
                    ${
                      touched.yearsOfExperience && errors.yearsOfExperience
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="yearsOfExperience"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Farmer Video Upload */}
              <div>
                <label className="block text-lg text-green-900 font-semibold mb-2">
                  Upload Experience Video
                </label>
                <div
                  className={`flex flex-col justify-center items-center  h-[81px] border-2 border-dashed rounded-lg cursor-pointer transition-colors
                                     ${
                                       touched.farmerVideo && errors.farmerVideo
                                         ? 'border-red-400 bg-red-50 hover:bg-red-100'
                                         : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                     }`}
                  onClick={() => document.getElementById('farmerVideo')?.click()}
                >
                  <input
                    type="file"
                    name="farmerVideo"
                    id="farmerVideo"
                    className="hidden"
                    accept="video/mp4, video/avi, video/mov, video/mkv"
                    onChange={(event) => {
                      setFieldValue(
                        'farmerVideo',
                        event.currentTarget.files ? event.currentTarget.files[0] : null,
                      );
                    }}
                  />

                  {values.farmerVideo ? (
                    <video
                      src={URL.createObjectURL(values.farmerVideo)}
                      controls
                      className="h-full w-auto object-contain rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Centered Upload Icon */}
                      <UploadIcon className="w-6 h-6 text-gray-400" />

                      {/* Label Below Icon */}
                      <span className="text-green-700 text-sm font-medium mt-1">Video Upload</span>
                    </div>
                  )}
                </div>

                <ErrorMessage
                  name="farmerVideo"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Contact Number */}
              <div className="relative">
                <label
                  htmlFor="Certification"
                  className="absolute bg-white text-green-900 top-[-15px] left-3 block text-lg px-2 font-semibold text-gray-700 mb-1"
                >
                  Certification (if any)
                </label>
                <Field
                  type="tel"
                  name="Certification"
                  id="Certification"
                  placeholder="Enter certification details"
                  className={`w-full p-3 border rounded-lg shadow-sm transition-colors border-2 border-green-800
                    ${
                      touched.Certification && errors.Certification
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                <ErrorMessage
                  name="Certification"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Farmer Photo Upload */}
              <div>
                <label className="block text-lg font-semibold text-green-900 mb-2">
                  Upload Certificate
                </label>
                <div
                  className={`flex justify-center items-center w-full h-[81px] border-2 border-dashed rounded-lg cursor-pointer transition-colors
                                                ${
                                                  touched.CertificateImage &&
                                                  errors.CertificateImage
                                                    ? 'border-red-400 bg-red-50 hover:bg-red-100'
                                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                                }`}
                  onClick={() => document.getElementById('farmerPhoto')?.click()}
                >
                  <input
                    type="file"
                    name="CertificateImage"
                    id="CertificateImage"
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => {
                      setFieldValue(
                        'CertificateImage',
                        event.currentTarget.files ? event.currentTarget.files[0] : null,
                      );
                    }}
                  />
                  {values.CertificateImage ? (
                    <img
                      src={URL.createObjectURL(values.CertificateImage)}
                      alt="Farmer preview"
                      className="h-full w-auto object-contain rounded-md"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                      <UploadIcon className="h-6 w-6 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Image Upload</p>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="CertificateImage"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Aadhar Card Number */}
              <div className="relative">
                <label
                  htmlFor="awards"
                  className="absolute bg-white text-green-900 top-[-15px] left-3 block text-lg px-2 font-semibold text-gray-700 mb-1"
                >
                  awards (if any){' '}
                </label>
                <Field
                  type="tel"
                  name="awards"
                  id="awards"
                  placeholder="Enter certification details"
                  className={`w-full p-3 border rounded-lg shadow-sm transition-colors border-2 border-green-800
                                     ${
                                       touched.awards && errors.awards
                                         ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                         : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                     }`}
                />
                <ErrorMessage name="awards" component="div" className="text-red-500 text-xs mt-1" />
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

export default FarmingExperienceDetails;
