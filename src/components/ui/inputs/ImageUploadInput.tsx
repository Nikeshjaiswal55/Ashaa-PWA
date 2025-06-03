import { ErrorMessage } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import gallery from '../../../assets/Icons/gallery.svg';
import { FormValues } from '../../../pages/DataCollectionForm/FarmerDetails/index';

interface ImageUploadInputProps {
  values: FormValues;
  name: string;
  label: string;
  id: string;
  placeholder: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}
const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  label,
  errors,
  touched,
  values,
  setFieldValue,
}) => {
  return (
    <>
      <div>
        <label className="block text-lg font-semibold w-full text-green-800 mb-2">{label}</label>
        <div
          className={`flex justify-center items-center w-full h-[81px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer transition-colors
          ${
            touched[name as keyof typeof touched] && errors[name as keyof typeof errors]
              ? 'border-red-400 bg-red-50 hover:bg-red-100'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => document.getElementById(name)?.click()}
        >
          <input
            type="file"
            name={name}
            id={name}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            onChange={(event) => {
              setFieldValue(name, event.currentTarget.files ? event.currentTarget.files[0] : null);
            }}
          />
          {values[name as keyof FormValues] ? (
            <img
              src={URL.createObjectURL(values[name as keyof FormValues] as File)}
              alt="Preview"
              className="h-full w-auto object-contain rounded-md"
            />
          ) : (
            <div className="text-center flex flex-col items-center justify-center">
              <img src={gallery} alt="Upload Icon" className="h-[24px] w-[24px] mb-2" />
              <p className="mt-0 text-sm text-green-600">Upload image</p>
            </div>
          )}
        </div>
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  );
};
export default ImageUploadInput;
