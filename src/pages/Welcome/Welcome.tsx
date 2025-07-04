import React from 'react';
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

// custom wrapper of Toaster

interface WelcomeFormValues {
  email: string;
  password: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

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
      const token = response.data?.access_token;
      const isFirstLogin = response.data?.user?.is_first_login;

      if (token) {
        localStorage.setItem('token', token);

        toast.success(' Login Successful!', {
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

  return (
    <>
      <Meta title="Welcome" />
      <Toaster position="top-right" richColors />

      <div className="bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-4 text-2xl h-[35px] font-semibold text-[#005B24]">Welcome</h2>
            <p className="text-base font-bold text-gray-500">
              Enter your mobile number or Gmail, and we&apos;ll send an OTP on WhatsApp.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <img
              src={login_illustration}
              alt="Password Illustration"
              className="w-48 h-48 object-contain"
            />
          </div>

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
                  type="password"
                  labelcss="text-[#005B24] text-lg font-semibold"
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
    </>
  );
};

export default Welcome;
