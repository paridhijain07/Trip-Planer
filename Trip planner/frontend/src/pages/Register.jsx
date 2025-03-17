import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Axios from '../utils/axios';
import summaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/axiosToast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validValue = Object.values(data).every(el=>el)
  const navigate=useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(data.password!==data.confirmPassword){
        toast.error(
            'Password and Confirm Password must be same !'
        )
        return
    }
    try {
        const response=await Axios({
            ...summaryAPI.register,
            data:data,
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.success(response.data.message)
            setData({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            navigate('/login')
        }
        console.log("response",response)
    } 
    catch (error) {
        AxiosToastError(error)
    }
  }
  return (
    <section className="w-full px-6 container mx-auto">
      <div className="bg-white p-4 my-4 max-w-lg mx-auto rounded">
        <p className="text-center">Welcome to tripGuide!</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
              className="bg-blue-50 p-2 w-full rounded"
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
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
            <div className="flex items-center w-full">
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
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="flex items-center w-full">
              <input
                className="bg-blue-50 p-2 w-full rounded flex-grow"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer p-2"
              >
                {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!validValue}
            type="submit"
            className={`${validValue?"bg-green-700":"bg-gray-500"} text-white py-2 px-4 rounded mt-4 hover:bg-primary-200 w-full`}
          >
            Register
          </button>
        </form>
        <p className='text-center'>Already have account ?   <Link className='font-semibold text-green-700' to={'/login'}>Login</Link></p>
      </div>
    </section>
  );
};

export default Register;
