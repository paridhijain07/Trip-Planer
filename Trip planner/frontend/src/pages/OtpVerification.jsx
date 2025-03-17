import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/axiosToast';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const OtpVerification = () => {
  const [data, setData] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Email extraction and validation
  useEffect(() => {
    const { email: stateEmail } = location.state || {};
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      toast.error('No email provided. Please try again.');
      navigate('/forgot-password'); // Redirect to forgot password page
    }
  }, [location, navigate]);

  // Handle input change for OTP fields
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) { // Accept only numeric input
      setData((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });

      // Automatically move to the next input field
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Check if all OTP fields are filled
  const validValue = data.every((el) => el);

  // Handle OTP verification submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otp = data.join(''); // Combine the array into a single string
      console.log('Sending OTP:', otp, 'Email:', email);

      const response = await Axios({
        ...summaryAPI.verifyOtp,
        data: { otp, email },
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/reset-password',{
          state:{
            data:response.data,
            email:email,
          }
        }
      ); // Navigate to reset password page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email is required to resend OTP');
      return;
    }

    try {
      const response = await Axios({
        ...summaryAPI.resendOtp,
        data: { email },
      });

      if (response.data.success) {
        toast.success('OTP sent to your email!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full px-6 container mx-auto">
      <div className="bg-white p-4 my-4 max-w-lg mx-auto rounded">
        <p className="text-center">Enter the OTP sent to your email</p>
        {email && <p className="text-center text-sm text-gray-500">Sent to: {email}</p>}
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex gap-2 justify-center">
            {data.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="bg-blue-50 p-2 w-10 h-10 text-center rounded"
                maxLength="1"
              />
            ))}
          </div>
          <button
            disabled={!validValue}
            type="submit"
            className={`${
              validValue ? 'bg-green-700' : 'bg-gray-500'
            } text-white py-2 px-4 rounded mt-4 hover:bg-primary-200 w-full`}
          >
            Submit
          </button>
        </form>
        <p className="text-center mt-4">
          Didn't receive the OTP?{' '}
          <button className="font-semibold text-green-700" type="button" onClick={handleResendOtp}>
            Resend OTP
          </button>
        </p>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link className="font-semibold text-green-700" to={'/login'}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
