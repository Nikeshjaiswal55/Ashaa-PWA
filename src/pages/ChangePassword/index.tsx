import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import Meta from '@/components/Meta';
import TextInput from '@/components/ui/inputs/TextInput';
import { useChangePasswordMutation } from '@/redux/slices/ApiSlice';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const initialValues: ChangePasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values: ChangePasswordValues) => {
    try {
      const payload = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
      };

      const response = await changePassword(payload).unwrap();
      console.log('Password changed successfully:', response);
      alert('Password changed successfully!');
      if (response) {
        navigate('/home');
      }
    } catch (error: unknown) {
      console.error('Password change failed:', error?.data?.message || error.message);
      alert('Failed to change password. Please try again.');
    }
  };
  return (
    <>
      <Meta title="Change Password" />
      <div className="bg-white min-h-screen flex  justify-center px-[23px]">
        <div className="max-w-md w-full mt-[50px] space-y-30">
          <div className="text-center">
            <h2 className=" text-2xl font-semibold text-[#005B24]">Change Password</h2>
            <p className="text-base font-bold text-gray-500">Update your password securely.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-[23px] ">
                <TextInput
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Enter current password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type="password"
                  labelcss="text-[#005B24] text-lg font-semibold"
                />

                <TextInput
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type="password"
                  labelcss="text-[#005B24] text-lg font-semibold"
                />

                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type="password"
                  labelcss="text-[#005B24] text-lg font-semibold"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#005B24] text-white rounded-md text-lg font-semibold disabled:opacity-60"
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
