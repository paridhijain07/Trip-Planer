import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
// import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
// import AxiosToastError from '../utils/axiosToast';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(data).every((el) => el);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryAPI.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accessToken',response.data.data.accessToken);
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        setData({
          email: '',
          password: '',
        });
        navigate('/login');
      }
      console.log('response', response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full px-6 container mx-auto">
      <div className="bg-white p-4 my-4 max-w-lg mx-auto rounded">
        <p className="text-center">Welcome to tripGuide!</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-blue-50 p-2 w-full rounded"
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="flex items-center w-full relative">
              <input
                className="bg-blue-50 p-2 w-full rounded flex-grow"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer p-2"
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </div>
            </div>
            <div className="text-right mt-1">
              <Link
                to={"/forgot-password"}
                className="text-sm text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!validValue}
            type="submit"
            className={`${
              validValue ? 'bg-green-700' : 'bg-gray-500'
            } text-white py-2 px-4 rounded mt-4 hover:bg-primary-200 w-full`}
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{' '}
          <Link className="font-semibold text-green-700" to={'/register'}>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
