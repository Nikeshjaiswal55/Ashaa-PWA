import { ErrorMessage } from 'formik';
import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';
import { UploadIcon } from 'lucide-react';

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
        <label className="block text-lg font-semibold text-green-800 mb-2">{label}</label>
        <div
          className={`flex justify-center items-center w-full h-[81px] border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${
            touched[name] && errors[name]
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
          {values[name] ? (
            <img
              src={URL.createObjectURL(values[name])}
              alt="Preview"
              className="h-full w-auto object-contain rounded-md"
            />
          ) : (
            <div className="text-center flex flex-col items-center justify-center">
              <UploadIcon className="h-6 w-6 text-gray-400" />
              <p className="mt-1 text-sm text-green-600">Upload image</p>
            </div>
          )}
        </div>
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  );
};
export default ImageUploadInput;
