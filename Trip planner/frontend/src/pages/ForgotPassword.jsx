import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/axiosToast';

const ForgotPassword = () => {
  const [data, setData] = useState({ email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...summaryAPI.forgotPassword, data });
      console.log('API Response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ email: '' });
        navigate('/verify-forgot-password', { state: { email: data.email } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-gray-600">Enter your email to receive an OTP</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="grid gap-1">
            <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
            <input
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={!validValue}
            type="submit"
            className={`w-full py-2 rounded text-white font-semibold transition-all ${validValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
          >
            Send OTP
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700">
          Remembered your password?{' '}
          <Link className="font-semibold text-blue-600 hover:underline" to={'/login'}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
