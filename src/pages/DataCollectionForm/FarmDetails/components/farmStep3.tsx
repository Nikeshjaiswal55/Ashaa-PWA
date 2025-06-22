import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import { FarmFormValues } from '..';
import ImageUploadInput from '../../../../components/ui/inputs/ImageUploadInput';
import SelectInput from '../../../../components/ui/inputs/SelectInput';
import ToggleButtonGroup from '../../../../components/ui/inputs/ToggleButtonGroup';

const soilTypeOptions = ['Sandy', 'Clay', 'Silty', 'Peaty', 'Saline', 'Loamy', 'Black', 'Red'];

interface FarmStep3Props {
  values: FarmFormValues;
  errors: FormikErrors<FarmFormValues>;
  touched: FormikTouched<FarmFormValues>;
  setFieldValue: FormikHelpers<FarmFormValues>['setFieldValue'];
}
const FarmStep3: React.FC<FarmStep3Props> = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full max-w-2xl mt-8 rounded-xl md:p-8">
        <div className="space-y-[23px]">
          {/* Soil Type */}
          <SelectInput
            values={values}
            label="Soil Type"
            labelFirst=""
            name="soilType"
            options={soilTypeOptions}
            defaultOption="Select your Soil Type"
            width="w-full"
            height="h-[52px]"
            customClass="border-2"
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            labelcss="px-2"
          />

          {/* Attach Soil Photo */}
          <div>
            <label className="block text-lg font-semibold text-green-900 mb-2">
              Attach Soil Photo
            </label>
            <ImageUploadInput
              values={values}
              name="soilPhoto"
              label=""
              id="soilPhoto"
              height="h-[167px]"
              placeholder="Upload field photo"
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </div>

          {/* Soil Testing Report Available */}
          <ToggleButtonGroup
            label="Soil Testing Report Available?"
            value={values.soilTestingReportAvailable}
            onChange={(val) => setFieldValue('soilTestingReportAvailable', val)}
            className="bg-[rgba(54,195,96,0.2)]"
          />

          {/* Soil Testing Report Upload */}
          <div>
            <label className="block text-lg font-semibold text-green-900 mb-2">
              Soil Testing Report Available?
            </label>
            <ImageUploadInput
              values={values}
              name="soilTestingReport"
              label=""
              id="soilTestingReport"
              placeholder="Upload PDF or image"
              height="h-[167px]"
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmStep3;
