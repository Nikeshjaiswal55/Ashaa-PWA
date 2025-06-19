import React from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import Meta from '@/components/Meta';

import login_illustration from '../../assets/auth/welcome_screen.svg';

function Welcome() {
  const validationSchema = Yup.object({
    identifier: Yup.string()
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

  const handleSubmit = (values: { identifier: string }) => {
    alert(`Sending OTP to ${values.identifier}`);
  };

  return (
    <>
      <Meta title="Welcome" />
      <div className="bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-4 text-2xl h-[35px] font-semibold text-[#005B24]">Welcome</h2>
            <p className="text-base font-bold text-gray-500">
              {' '}
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
            initialValues={{ identifier: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <div className="relative w-full mb-6">
                <label
                  htmlFor="identifier"
                  className="absolute -top-4 left-3 bg-white px-1 text-lg text-[#005B24] font-semibold z-10"
                >
                  Mobile Number/Gmail
                </label>
                <Field
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Enter your mobile number"
                  className="w-full h-[52px] rounded-md border-2 border-[#005B24] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage name="identifier">
                  {(msg) => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div className="relative w-full mb-6">
                <label
                  htmlFor="password"
                  className="absolute -top-4 left-3 bg-white px-1 text-lg text-[#005B24] font-semibold z-10"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-[52px] rounded-md border-2 border-[#005B24] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#005B24] text-white rounded-md text-lg font-semibold "
              >
                Get OTP
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Welcome;
