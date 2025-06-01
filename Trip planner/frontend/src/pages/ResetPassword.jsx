import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/axiosToast';

const ResetPassword = () => {
  const [data, setData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.newPassword || !data.confirmPassword) {
      toast.error("Email, New Password, and Confirm Password are required");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await Axios({ ...summaryAPI.resetPassword, data });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ email: '', newPassword: '', confirmPassword: '' });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Toaster />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Your Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 cursor-pointer text-gray-400"
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 cursor-pointer text-gray-400"
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
          </div>
          <button
            disabled={!validValue}
            type="submit"
            className={`w-full p-2 rounded text-white font-bold ${
              validValue ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'
            }`}
          >
            Reset Password
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
