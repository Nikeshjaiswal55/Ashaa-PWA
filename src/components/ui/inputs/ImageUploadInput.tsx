import React from 'react';

import imageCompression from 'browser-image-compression';
import { ErrorMessage } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import gallery from '../../../assets/Icons/gallery.svg';
import { FormValues } from '../../../pages/DataCollectionForm/FarmerDetails/index';

interface ImageUploadInputProps<T> {
  values: T;
  name: string;
  label: string;
  id: string;
  placeholder: string;
  height?: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

// convert file to base64
const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUploadInput = <T extends object>({
  name,
  label,
  errors,
  touched,
  height,
  values,
  setFieldValue,
}: ImageUploadInputProps<T>) => {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.1, // was 0.5
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile);
      console.log('Original:', file.size / 1024, 'KB');
      console.log('Compressed:', compressedFile.size / 1024, 'KB');
      if (compressedFile.size / 1024 > 150) {
        alert('Compressed image is still too large. Please choose a smaller image.');
        return;
      }

      // Save base64 string in formik
      setFieldValue(name, base64);
    } catch (error) {
      console.error('Image compression error:', error);
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold w-full text-[#005B24] mb-1">{label}</label>
      <div
        className={`flex justify-center items-center w-full h-[81px] ${height} border-[2px] border-dashed rounded-[10px] cursor-pointer transition-colors ${
          touched[name as keyof typeof touched] && errors[name as keyof typeof errors]
            ? 'border-red-400 bg-red-50 hover:bg-red-100'
            : 'border-gray-300'
        }`}
        onClick={() => document.getElementById(name)?.click()}
      >
        <input
          type="file"
          name={name}
          id={name}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={handleImageChange}
        />

        {values[name as keyof T] ? (
          <img
            src={values[name as keyof T] as string}
            alt="Uploaded Preview"
            className="h-full w-auto object-contain rounded-md"
          />
        ) : (
          <div className="text-center flex flex-col items-center justify-center">
            <img src={gallery} alt="Upload Icon" className="h-[35.26px] w-[35.26px] mb-2" />
            <p className="mt-0 text-sm text-green-600">Upload image</p>
          </div>
        )}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default ImageUploadInput;
