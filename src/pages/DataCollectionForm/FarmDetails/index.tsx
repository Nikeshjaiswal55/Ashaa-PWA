import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import { farmDetailsValidationSchemas } from '@/constants/validationSchemas';
import { useSaveFarmerAllMutation } from '@/redux/slices/ApiSlice';

import image from '../../../assets/header/image.png';
import '../form.css';
// forms import
import FarmStep1 from './components/farmStep1';
import FarmStep2 from './components/farmStep2';
import FarmStep3 from './components/farmStep3';
import FarmStep4 from './components/farmStep4';
import FarmStep5 from './components/farmStep5';
import FarmStep6 from './components/farmStep6';
import FarmStep7 from './components/farmStep7';
import FarmStep8 from './components/farmStep8';

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
// --- waterManagement Interface ---
export interface waterManagement {
  waterSource: string;
  waterSourcePhoto: File | null;
  waterRetentionCapacity: string;
  drainageQuality: string;
}

// --- CropList Interface ---
export interface CropList {
  cultivationArea: string;
  cropName: string;
  cropVariety: string;
  seedSource: string;
  seedingRate: string;
  seedingRateUnit: string;
  seedName: string;
  cropPhoto: File | null;
}

//  --- FertilizerUsageList Interface ---
export interface FertilizerUsageList {
  fertilizerName: string;
  fertilizerType: string;
  quantity: string;
  price: string;
  companyName: string;
  appliedRate: string;
  appliedStage: string;
}

//  --- PesticidesUsage Interface ---
export interface PesticidesUsage {
  pesticidesName: string;
  pesticidesType: string;
  pesticidesQuantity: string;
  pesticidesprice: string;
  pesticidescompanyName: string;
  pesticidesappliedRate: string;
  pesticidesappliedStage: string;
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
  waterSource: string[];
  waterSourcePhoto: File | null;
  waterRetentionCapacity: string;
  waterManagement: waterManagement[];
  drainageQuality: string;

  // step-5
  farmerPhoto: File | null;
  farmPhoto: File | null;

  //step 6
  cultivationArea: string;
  cropName: string;
  cropVariety: string;
  seedSource: string[];
  seedingRate: string;
  CropList: CropList[];
  seedingRateUnit: string;
  seedName: string;
  cropPhoto: File | null;
  //step 7
  fertilizerName: string;
  fertilizerType: string;
  quantity: string;
  price: string;
  FertilizerUsageList: FertilizerUsageList[];
  companyName: string;
  appliedRate: string;
  appliedStage: string;
  // step 8
  pesticidesName: string;
  pesticidesType: string;
  pesticidesQuantity: string;
  pesticidesprice: string;
  pesticidescompanyName: string;
  pesticidesappliedRate: string;
  pesticidesappliedStage: string;
  pesticidesUsageList: PesticidesUsage[];
}

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

// --- Build farmerFarmDetails payload ---
function getStepPayload(step: number, values: FarmFormValues) {
  switch (step) {
    case 1:
      return {
        farmerFarmDetails: [
          {
            size: values.individualFarmSize,
            location: values.farmLocation,
            survey_number: values.khasraNumber,
            ownership_name: values.ownerName,
            owned_by: values.landOwnership,
            topography: values.topography,
            is_form_valid: true,
          },
        ],
      };

    case 2:
      return {
        farmerFarmDetails: [
          {
            irrigation_method: values.irrigationMethod,
            kcc_status: values.hasKCC,
            loan_status: values.loanApproved,
            labour_availability: values.laborAvailability,
            labour_payout_method: values.hiredLaborPayment,
            farming_approach: values.farmingApproach,
            cropping_pattern: values.croppingPattern,
            primary_market: values.primaryMarket,
            is_form_valid: true,
          },
        ],
      };

    case 3:
      return {
        farmerFarmDetails: [
          {
            soil_type: values.soilType,
            soil_image: values.soilPhoto,
            soil_report_image: values.soilTestingReport,
            soil_report_name: '',
            farm_photo: values.farmPhoto,
            is_form_valid: true,
          },
        ],
      };

    case 4:
      return {
        farmerFarmDetails: [
          {
            farmerWaterManagement: values.waterManagement.map((wm) => ({
              water_source: [wm.waterSource],
              water_source_image: wm.waterSourcePhoto,
              water_retention_capacity: wm.waterRetentionCapacity,
              drainage_quality: wm.drainageQuality,
              is_active: true,
              is_form_valid: true,
            })),
          },
        ],
      };

    case 5:
      return {
        farmerFarmDetails: [
          {
            farm_photo: values.farmPhoto,
          },
        ],
      };

    case 6:
      return {
        farmerFarmDetails: [
          {
            farmerCropDetail: values.CropList.map((crop) => ({
              cultivation_area: crop.cultivationArea,
              crop_name: crop.cropName,
              crop_variety: crop.cropVariety,
              seed_source: Array.isArray(crop.seedSource) ? crop.seedSource : [crop.seedSource],
              seeding_rate: crop.seedingRate,
              seeding_unit: crop.seedingRateUnit,
              seed_name: crop.seedName,
              crop_image: crop.cropPhoto,
              is_form_valid: true,
            })),
          },
        ],
      };

    case 7:
      return {
        farmerFarmDetails: [
          {
            farmerFertilizer: values.FertilizerUsageList.map((fert) => ({
              name: fert.fertilizerName,
              type: fert.fertilizerType,
              quantity: fert.quantity,
              price: fert.price,
              brand_name: fert.companyName,
              applied_rate: fert.appliedRate,
              applied_stage: fert.appliedStage,
              is_form_valid: true,
            })),
          },
        ],
      };

    case 8:
      return {
        farmerFarmDetails: [
          {
            farmerPesticide: values.pesticidesUsageList.map((pest) => ({
              name: pest.pesticidesName,
              type: pest.pesticidesType,
              quantity: pest.pesticidesQuantity,
              price: pest.pesticidesprice,
              brand_name: pest.pesticidescompanyName,
              applied_rate: pest.pesticidesappliedRate,
              applied_stage: pest.pesticidesappliedStage,
              is_form_valid: true,
            })),
          },
        ],
      };

    default:
      return {};
  }
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
  const [step, setStep] = useState(8);
  const [showCropDetailsForm, setShowCropDetailsForm] = useState(true); // //for show or hide Crop Details form step 4
  // const navigate = useNavigate();
  const [saveFarmerAll] = useSaveFarmerAllMutation();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const shouldReset = searchParams.get('reset');
    if (shouldReset === 'true') {
      setStep(1);
    }
    1;
  }, [searchParams]);

  // --- Initial Form Values ---
  const initialValues: FarmFormValues = {
    individualFarmSize: '',
    farmSizeUnit: '',
    farmLocation: '',
    khasraNumber: '',
    landOwnership: '',
    ownerName: '',
    topography: '',

    // Step 2
    irrigationMethod: 'Drip',
    hasKCC: false,
    loanApproved: false,
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
    waterSource: [],
    waterSourcePhoto: null,
    waterRetentionCapacity: 'Low',
    drainageQuality: 'Good',

    // step-5
    farmerPhoto: null,
    farmPhoto: null,

    //step 6
    cultivationArea: '',
    cropName: '',
    cropVariety: '',
    seedSource: [],
    seedingRate: '',
    CropList: [],
    seedingRateUnit: 'kg/Acre',
    seedName: '',
    cropPhoto: null,
    //step 7
    fertilizerName: '',
    fertilizerType: '',
    quantity: '',
    price: '',
    companyName: '',
    FertilizerUsageList: [],
    appliedRate: '',
    appliedStage: '',

    // step 8
    pesticidesName: '',
    pesticidesType: '',
    pesticidesQuantity: '',
    pesticidesprice: '',
    pesticidescompanyName: '',
    pesticidesappliedRate: '',
    pesticidesappliedStage: '',
    pesticidesUsageList: [],
  };

  const handleSubmit = async (
    values: FarmFormValues,
    { setSubmitting }: FormikHelpers<FarmFormValues>,
  ) => {
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
      if (step < farmDetailsValidationSchemas.length) {
        setStep((prev) => prev + 1);
      } else {
        console.log('all steps have complete');
        toast.success('Successful!', {
          description: 'All steps done, final submission.',
          duration: 3000,
        });
        // navigate('/onboarding/farmer-farm/progress',{
        //   state: { reset: true }, // Reset the form on progress page
        // });
      }
    } catch (e: unknown) {
      alert('API Error: ' + (e?.data?.message || e?.message || 'Unknown error'));
    }
    setSubmitting(false);
  };

  // --- Render  form---
  return (
    <div
      className="flex flex-col items-center p-[24px] min-h-screen"
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-sm font-normal ${
                  s <= step ? 'bg-[#005B24] text-white ' : 'bg-[#858585] text-white'
                }`}
              >
                {s}
              </div>
              {s < 8 && (
                <div
                  className={`h-0.5 w-4 sm:w-6 ${s < step ? 'bg-green-600' : 'bg-gray-500'}`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* back button */}
        <div className="relative w-full flex items-center justify-center mb-4">
          {/* Back Button - absolute positioned on the left */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute left-0 text-green-900 border-2 border-green-900 rounded-full "
            >
              <BackArrowIcon className="w-5 h-5" />
            </button>
          )}

          {/* Centered Title */}
          <h1 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-[#005B24] text-center">
            {HeaderData[step - 1]}
          </h1>
        </div>

        {/* <h3 className="text-center">{HeaderData[step - 1]}</h3> */}
        <Formik
          initialValues={initialValues}
          validationSchema={farmDetailsValidationSchemas[step - 1]}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form className="flex flex-col flex-grow ">
              <div className="flex-grow space-y-6">
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
                {step === 6 && (
                  <FarmStep6
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    showCropDetailsForm={showCropDetailsForm}
                    setShowCropDetailsForm={setShowCropDetailsForm}
                  />
                )}
                {step === 7 && (
                  <FarmStep7
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {step === 8 && (
                  <FarmStep8
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
              </div>

              {/* Submit Button */}
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
                        {' '}
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></circle>{' '}
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>{' '}
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {step < farmDetailsValidationSchemas.length ? 'Next Step' : 'Submit'}
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
