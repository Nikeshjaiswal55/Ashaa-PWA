import { FormikErrors, FormikHelpers, FormikTouched } from 'formik';

import SelectInput from '@/components/ui/inputs/SelectInput';
import TextInput from '@/components/ui/inputs/TextInput';
import ToggleButtonGroup from '@/components/ui/inputs/ToggleButtonGroup';

import { FormValues } from '../../FarmerDetails/index';

const internetOptions = ['WiFi', 'Mobile Data', 'No Internet'];
const ownerOptions = ['Self', 'Son', 'Daughter', 'Other'];

interface FarmerStep5Props {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const FarmerStep6: React.FC<FarmerStep5Props> = ({ values, errors, touched, setFieldValue }) => (
  <div className="space-y-[23px] pt-[78px]">
    {/* Smartphone Ownership */}
    <ToggleButtonGroup
      label="Smartphone Ownership"
      value={values.smartphoneOwnership}
      onChange={(val) => setFieldValue('smartphoneOwnership', val)}
      className="bg-[rgba(54,195,96,0.2)] "
    />

    {/* Internet Access */}
    <SelectInput<FormValues>
      label="Internet Access"
      name="internetAccess"
      options={internetOptions}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      defaultOption="Select your Internet Access"
      width="w-full"
      height="h-[50px]"
      customClass={'border-[2px]'}
      labelFirst={''}
    />

    {/* Owned By */}
    <SelectInput<FormValues>
      label="Owned By"
      name="ownedBy"
      options={ownerOptions}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      defaultOption="Self / Son"
      width="w-full"
      height="h-[50px]"
      customClass={'border-[2px]'}
      labelFirst={''}
    />

    {/* Farm Software/Apps Used */}
    <ToggleButtonGroup
      label="Farm Software/Apps Used?"
      value={values.farmSoftwareUsed}
      onChange={(val) => setFieldValue('farmSoftwareUsed', val)}
      className="bg-[rgba(54,195,96,0.2)] "
    />

    {/* App Name */}
    <TextInput<FormValues>
      label="App Name"
      name="appName"
      placeholder="Enter name of software/app"
      type="text"
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      labelcss={''}
    />
  </div>
);

export default FarmerStep6;
