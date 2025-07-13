import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Meta from '@/components/Meta';
import TextInput from '@/components/ui/inputs/TextInput';
import { Toaster } from '@/components/ui/sonner';
import { useLoginMutation } from '@/redux/slices/ApiSlice';

import login_illustration from '../../assets/auth/welcome_screen.svg';

interface WelcomeFormValues {
  email: string;
  password: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .test(
        'is-valid',
        'Enter a valid 10-digit mobile number or a valid email address',
        (value) => {
          const isPhone = /^\d{10}$/.test(value || '');
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
          return isPhone || isEmail;
        },
      )
      .required('This field is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: WelcomeFormValues) => {
    try {
      const response = await login(values).unwrap();
      const token = response.data?.data?.access_token;
      const isFirstLogin = response.data?.data?.user?.is_first_login;

      if (token) {
        localStorage.setItem('token', token);
        toast.success('Login Successful!', {
          description: 'Welcome to Ashaa Dashboard',
          duration: 3000,
        });

        setTimeout(() => {
          if (isFirstLogin === true) {
            navigate('/change-password');
          } else {
            navigate('/home');
          }
        }, 2000);
      }
    } catch (error: unknown) {
      console.error('Login failed:', error?.data?.message || error.message);
      toast.error('Login failed! Please check your credentials.');
    }
  };

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
      <Meta title="Welcome" />
      <Toaster position="top-right" richColors />

      <div className="bg-white min-h-screen flex flex-col px-4">
        {/* Top Section */}
        <div className="pt-8 text-center">
          <h2 className="mt-5 text-2xl font-semibold text-[#005B24]">Welcome</h2>
          <p className="text-base font-bold text-gray-500 max-w-sm mx-auto">
            Enter your mobile number or Gmail, and we&apos;ll send an OTP on WhatsApp.
          </p>
        </div>

        {/* Image Vertically Centered */}
        <div className="flex flex-[0.5] justify-center items-center">
          <img
            src={login_illustration}
            alt="Password Illustration"
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="pb-8">
          <div className="max-w-md w-full mx-auto">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="space-y-6">
                  <TextInput
                    name="email"
                    label="Mobile Number/Gmail"
                    placeholder="Enter your mobile number or email"
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={values}
                    type="text"
                    labelcss="text-[#005B24] text-lg font-semibold"
                  />
                  <TextInput
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={values}
                    type={showPassword ? 'text' : 'password'}
                    labelcss="text-[#005B24] text-lg font-semibold"
                    rightIcon={
                      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? EyeClosedIcon : EyeOpenIcon}
                      </button>
                    }
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-[#005B24] text-white rounded-md text-lg font-semibold disabled:opacity-60 flex justify-center items-center"
                  >
                    {isLoading ? <FadeLoader color="#ffffff" height={8} width={3} /> : 'LOG IN'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
