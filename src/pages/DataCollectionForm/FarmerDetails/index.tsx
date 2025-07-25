import React, { useState } from 'react';

import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import { farmerDetailsValidationSchemas } from '@/constants/validationSchemas';
import { useSaveFarmerAllMutation } from '@/redux/slices/ApiSlice';

import image from '../../../assets/header/image.png';
import '../form.css';
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
const BackArrowIcon: React.FC<IconProps> = ({ className = 'w-[20px] h-[20px]' }) => (
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
  onRent: boolean;
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
  currentLocation: string;
  separateFarms: string; // Kept as string for input
  // state: string;
  // district: string;

  // subDistrict: string;
  // pinCode: string;
  // village: string;
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
  'Technology Access',
];

// Utility: Convert object (including nested, arrays, files) to FormData
function objectToFormData(
  obj: Record<string, unknown>,
  form?: FormData,
  namespace?: string,
): FormData {
  const fd = form || new FormData();
  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property) || obj[property] === undefined)
      continue;
    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (obj[property] instanceof File || obj[property] instanceof Blob) {
      fd.append(formKey, obj[property] as Blob);
    } else if (Array.isArray(obj[property])) {
      (obj[property] as unknown[]).forEach((value, i) => {
        if (typeof value === 'object' && value !== null) {
          objectToFormData(value as Record<string, unknown>, fd, `${formKey}[${i}]`);
        } else {
          fd.append(`${formKey}[${i}]`, value as string | Blob);
        }
      });
    } else if (typeof obj[property] === 'object' && obj[property] !== null) {
      objectToFormData(obj[property] as Record<string, unknown>, fd, formKey);
    } else if (obj[property] !== null) {
      fd.append(formKey, obj[property] as string | Blob);
    }
  }
  return fd;
}

// Step-wise payload mapping
function getStepPayload(step: number, values: FormValues) {
  switch (step) {
    case 1:
      return {
        farmerDetail: {
          name: values.farmerName,
          contact: values.contactNumber,
          gender: values.gender,
          aadhar_number: values.aadharCardNumber?.trim() ? values.aadharCardNumber : null,
          current_location: values.currentLocation?.trim() ? values.currentLocation : null,
          farm_size: values.totalFarmSize,
          farm_size_unit: values.farmSizeUnit,
          farm_count: Number(values.separateFarms),
          farm_experience: values.yearsOfExperience?.trim() ? values.yearsOfExperience : '',
          is_form_valid: true,
        },
      };
    case 2:
      return {
        farmerAdditionalInfo: {
          awards: values.awards,
          Certification: values.Certification,
          // Add more fields as per your step 2 form
        },
      };
    case 3:
      return {
        farmerLivestock: values.animals.map((animal) => ({
          animalType: animal.animalType,
          quantity: animal.quantity,
          milkProduction: animal.milkProduction,
          milkSellingPlace: animal.milkSellingPlace,
          breedName: animal.breedName,
          insuranceAvailable: animal.insuranceAvailable,
          insuranceCompany: animal.insuranceCompany,
          photo: animal.photo,
          is_form_valid: true,
        })),
      };
    case 4:
      return {
        farmerStorage: {
          storage_type: values.storageType,
          name: values.warehouseName,
          location: values.warehouseLocation,
          capacity: values.capacity,
          unit: values.capacityUnit,
          condition: values.condition,
          image: values.storagePhoto,
          is_form_valid: true,
        },
      };
    case 5:
      return {
        farmerEquipment: values.Equipment.map((eq) => ({
          equipment: eq.equipment,
          equipmentQuantity: eq.equipmentQuantity,
          equipment_type: eq.equipmentType,
          brand_name: eq.brandName,
          owner: eq.owner,
          // onRent: eq.onRent,
          insuranceCompany: eq.insuranceCompany,
          // equipmentDocument: eq.equipmentDocument,
          equipmentImage: eq.equipmentImage,
        })),
      };
    case 6:
      return {
        technologyAccess: {
          smartphoneOwnership: values.smartphoneOwnership,
          internetAccess: values.internetAccess,
          ownedBy: values.ownedBy,
          farmSoftwareUsed: values.farmSoftwareUsed,
          appName: values.appName,
        },
      };
    default:
      return {};
  }
}

// --- Main Form Component ---
export const FarmerDetailsForm: React.FC = () => {
  const [saveFarmerAll] = useSaveFarmerAllMutation();
  const [showForm, setShowForm] = useState(true);
  const [showForm2, setShowForm2] = useState(true);
  const [step, setStep] = useState(4);

  const initialValues: FormValues = {
    farmerName: '',
    contactNumber: '',
    aadharCardNumber: '',
    gender: 'Male',
    totalFarmSize: '',
    farmSizeUnit: 'Acre',
    separateFarms: '3',
    currentLocation: '',
    // state: '',
    // district: '',
    // subDistrict: '',
    // pinCode: '',
    // village: '',
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
    insuranceAvailable: false,
    insuranceCompany: '',
    quantity: 3,
    animals: [],
    photo: null,

    // step 4
    storageType: '',
    warehouseName: '',
    warehouseLocation: '',
    capacity: '100',
    capacityUnit: 'Quintals',
    condition: 'Good',
    storagePhoto: null,

    // step 5
    equipment: '',
    equipmentQuantity: 3,
    equipmentType: '',
    brandName: '',
    owner: '',
    cheak: 'Good',
    Equipment: [],
    onRent: false,
    equipmentDocument: null,
    equipmentImage: null,

    //  stepx-6
    smartphoneOwnership: false,
    internetAccess: '',
    ownedBy: '',
    farmSoftwareUsed: false,
    appName: '',
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const payload = getStepPayload(step, values);
    function containsFile(obj: unknown): boolean {
      if (!obj || typeof obj !== 'object') return false;
      if (obj instanceof File || obj instanceof Blob) return true;
      if (Array.isArray(obj)) return obj.some(containsFile);
      return Object.values(obj).some(containsFile);
    }
    const hasFile = containsFile(payload);
    try {
      if (hasFile) {
        const formData = objectToFormData(payload);
        await saveFarmerAll(formData).unwrap();
      } else {
        await saveFarmerAll(payload).unwrap();
      }
      if (step < farmerDetailsValidationSchemas.length) {
        setStep((prev) => prev + 1);
      } else {
        console.log('all steps have complete');
        toast.success('Successful!', {
          description: 'All steps done, final submission.',
          duration: 3000,
        });
      }
    } catch (e: unknown) {
      alert('API Error: ' + (e?.data?.message || e?.message || 'Unknown error'));
    }
    setSubmitting(false);
  };

  // --- Render  form---
  return (
    <div
      className="flex flex-col items-center p-[22px] min-h-screen"
      style={{
        backgroundImage: ` radial-gradient(circle at top right, rgba(0, 91, 36, 0.73) 0%, rgba(255, 255, 255, 0) 10%), url(${image}) `,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundPosition: 'top left',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-2xl rounded-xl md:p-8 flex flex-col flex-grow">
        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-0 sm:space-x-0 mb-[18px]">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-sm font-normal ${
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
        <div className="flex items-center mb-0 w-full">
          {/* Left: Back Button (fixed width) */}
          <div className="w-12 flex justify-start">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-green-900 w-[26px] h-[26px] border-2 border-green-900 rounded-full  "
              >
                {' '}
                <BackArrowIcon />{' '}
              </button>
            )}
          </div>
          {/* Center: Heading */}
          <div className="flex-1 flex flex-col items-center">
            <p
              className="text-2xl sm:text-2xl md:text-2xl font-semibold steps-heading"
              style={{ color: '#005B24' }}
            >
              {' '}
              Farmer Details{' '}
            </p>
          </div>
          <div className="w-12"></div>
        </div>
        <h3 className="text-center ">{HeaderData[step - 1]}</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={farmerDetailsValidationSchemas[step - 1]}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form className="flex flex-col flex-grow ">
              <div className="flex-grow">
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
              </div>

              {/* Submit Button */}
              <div className="py-4">
                <div className="flex justify-center md:justify-evenly w-full space-x-4">
                  {/* Draft Button */}
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 w-1/3 md:w-[90px] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none"
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
                    className="flex items-center justify-center bg-green-900 w-2/3 md:w-[250px]  hover:bg-green-900 text-white text-center font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        {step < farmerDetailsValidationSchemas.length ? 'Next Step' : 'Submit'}
                        <ArrowRightIcon className=" w-6 h-6" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FarmerDetailsForm;
