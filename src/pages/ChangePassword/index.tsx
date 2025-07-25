import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Meta from '@/components/Meta';
import TextInput from '@/components/ui/inputs/TextInput';
import { Toaster } from '@/components/ui/sonner';
import { changePasswordValidationSchema } from '@/constants/validationSchemas';
import { useChangePasswordMutation } from '@/redux/slices/ApiSlice';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const labelClass = 'text-[#005B24] text-lg font-semibold';

  const initialValues: ChangePasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (values: ChangePasswordValues) => {
    try {
      const payload = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
      };
      await changePassword(payload).unwrap();

      toast.success('Password changed successfully!', {
        description: 'Now redirecting to your dashboard...',
        duration: 3000,
      });

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'data' in error) {
        const err = error as { data?: { message?: string }; message?: string };
        toast.error('Failed to change password', {
          description: err.data?.message || err.message || 'Something went wrong',
        });
      }
    }
  };

  // SVG icon functions
  const EyeOpenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path
        d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
      5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 
      3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"
      />
    </svg>
  );

  const EyeClosedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path
        d="M12 5c-7.633 0-11 7-11 7 .636 1.327 1.584 2.676 2.853 3.877l-2.853 
      2.853 1.414 1.414 20-20-1.414-1.414-4.741 
      4.741c-1.169-.301-2.404-.471-3.759-.471zm10.147 
      3.123c.698.795 1.291 1.653 1.853 2.877 0 0-3.367 
      7-11 7-1.078 0-2.065-.111-2.987-.301l1.556-1.556c.45.107.921.178 
      1.431.178 2.761 0 5-2.239 5-5 0-.51-.071-.981-.178-1.431l2.174-2.174c.377.306.726.627 
      1.151 1.106z"
      />
    </svg>
  );

  return (
    <>
      <Meta title="Change Password" />
      <Toaster position="top-right" richColors />
      <div className="bg-white min-h-screen flex justify-center px-[23px]">
        <div className="max-w-md w-full mt-[50px] space-y-30">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#005B24]">Change Password</h2>
            <p className="text-base font-bold text-gray-500">Update your password securely.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={changePasswordValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-[23px]">
                <TextInput
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Enter current password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type={showCurrent ? 'text' : 'password'}
                  labelcss={labelClass}
                  rightIcon={
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)}>
                      {showCurrent ? EyeClosedIcon : EyeOpenIcon}
                    </button>
                  }
                />

                <TextInput
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type={showNew ? 'text' : 'password'}
                  labelcss={labelClass}
                  rightIcon={
                    <button type="button" onClick={() => setShowNew(!showNew)}>
                      {showNew ? EyeClosedIcon : EyeOpenIcon}
                    </button>
                  }
                />

                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  values={values}
                  type={showConfirm ? 'text' : 'password'}
                  labelcss={labelClass}
                  rightIcon={
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? EyeClosedIcon : EyeOpenIcon}
                    </button>
                  }
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
