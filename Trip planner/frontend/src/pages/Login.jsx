import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/axiosToast';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice'; // adjust path if needed

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...summaryAPI.login, data });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);

        // Extract user and tokens
        const user = response.data?.data?.user;
        const accessToken = response.data?.data?.accessToken;
        const refreshToken = response.data?.data?.refreshToken;
        // Dispatch to Redux store
        dispatch(loginSuccess({ user, accessToken }));

        // Store tokens and user in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        setData({ email: '', password: '' });
        navigate('/');
        console.log("API Login Response:", response.data);

      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Toaster />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-center text-2xl font-bold mb-4">Sign In to TripGuide</h2>
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
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
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
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm">Forgot Password?</Link>
          </div>
          <button
            disabled={!validValue}
            type="submit"
            className={`w-full p-2 rounded text-white font-bold ${validValue ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'}`}
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
