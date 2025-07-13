import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';
import { UploadIcon } from 'lucide-react';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';
import TextInput from '@/components/ui/inputs/TextInput';

import { FormValues } from '../../FarmerDetails/index';

interface FarmerStep2Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const FarmerStep2: React.FC<FarmerStep2Props> = ({ values, errors, touched, setFieldValue }) => {
  console.log('FarmerStep2 touch: ', touched);
  return (
    <div className="space-y-[23px] mt-[59px] pb-[75px]">
      {/*  Years of Farming Experience */}
      <TextInput<FormValues>
        label="Years of Farming Experience"
        name="yearsOfExperience"
        type="text"
        placeholder="Enter number of years"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        labelcss={''}
      />

      {/* Farmer Video Upload */}
      <div>
        <label className="block text-lg text-[#005B24] font-semibold mb-2">
          {' '}
          Upload Experience Video{' '}
        </label>
        <div
          className={`flex flex-col justify-center items-center  h-[81px] border-[2px] border-gray-500 border-dashed rounded-lg cursor-pointer transition-colors ${
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
        <ErrorMessage name="farmerVideo" component="div" className="text-red-500 text-xs mt-1" />
      </div>

      {/* Certification (if any) */}
      <TextInput<FormValues>
        label="Certification (if any)"
        name="Certification"
        type="text"
        placeholder="Enter certification details"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        labelcss={''}
      />

      {/* Farmer Photo Upload */}

      <ImageUploadInput<FormValues>
        name="CertificateImage"
        label="Upload Certificate"
        errors={errors}
        touched={touched}
        values={values}
        setFieldValue={setFieldValue}
        id="CertificateImage"
        placeholder="Image Upload"
      />

      {/* Aadhar Card Number */}
      <div className="relative">
        <label
          htmlFor="awards"
          className="absolute bg-white text-[#005B24] top-[-15px] left-3 block text-lg px-2 font-semibold  mb-1"
        >
          Awards (if any){' '}
        </label>
        <Field
          type="tel"
          name="awards"
          id="awards"
          placeholder="Enter certification details"
          className={`w-full p-3 border rounded-lg shadow-sm transition-colors border-[2px] border-green-800
                                             ${
                                               touched.awards && errors.awards
                                                 ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                 : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                             }`}
        />
        <ErrorMessage name="awards" component="div" className="text-red-500 text-xs mt-1" />
        <div className="mt-[23px]">
          <ImageUploadInput<FormValues>
            name="awardImage"
            label="Upload Award"
            errors={errors}
            touched={touched}
            values={values}
            setFieldValue={setFieldValue}
            id="awardImage"
            placeholder="Image Upload"
          />
        </div>
      </div>
    </div>
  );
};

export default FarmerStep2;
