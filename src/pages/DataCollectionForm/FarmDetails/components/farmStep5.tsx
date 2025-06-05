import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import ImageUploadInput from '@/components/ui/inputs/ImageUploadInput';

import { FarmFormValues } from '..';

interface FarmStep5Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}
const FarmStep5: React.FC<FarmStep5Props> = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="space-y-20 h-[70vh]">
      <ImageUploadInput
        name="farmPhoto"
        values={values}
        id="farmPhoto"
        placeholder="Upload farm image"
        height="h-[167px]"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        label={'Farm Photo'}
      />
      <ImageUploadInput
        name="farmerPhoto"
        values={values}
        id="farmerPhoto"
        placeholder="Upload farmer image"
        height="h-[167px]"
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        label={'Farmer Photo'}
      />
    </div>
  );
};

export default FarmStep5;
