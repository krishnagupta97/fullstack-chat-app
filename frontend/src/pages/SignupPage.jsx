import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { RiChatQuoteFill, RiUser5Fill, RiMailFill, RiKey2Fill, RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import { useNavigate } from "react-router-dom"
import Hero from "../assets/hero.png"
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Name is required!");
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format!");
    if (!formData.password) return toast.error("Password is required!");
    if (formData.password.length < 6) return toast.error("Password must contain atleast 6 characters");

    return true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true) signup(formData);
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md spavce-y-8 mb-10">
          <div className='flex flex-col justify-center items-center'>
            <div>
              <RiChatQuoteFill size={100} />
            </div>
            <h2 className='text-2xl font-bold '>Sign Up</h2>
            <p className='text-sm text-center mt-2'>Create your account now, and get connected with your loved ones!</p>
          </div>
        </div>

        <form onSubmit={submitHandler} className='space-y-6 w-full max-w-md'>
          <div className="form-control">
            <div>
              <label htmlFor="fullName" className='label'>Name:</label>
              <div className='input input-bordered flex items-center gap-4'>
                <RiUser5Fill size={20} />
                <input
                  onChange={onChangeHandler}
                  id='fullName'
                  name='fullName'
                  value={formData.fullName}
                  type="text"
                  className="grow"
                  placeholder="Username" />
              </div>
            </div>

            <div>
              <label className='label'>Email:</label>
              <div className='input input-bordered flex items-center gap-4'>
                <RiMailFill size={20} />
                <input
                  onChange={onChangeHandler}
                  id='email'
                  name='email'
                  value={formData.email}
                  type="email"
                  className="grow"
                  placeholder="Email" />
              </div>
            </div>

            <div>
              <label htmlFor="" className='label'>Password:</label>
              <div className='input input-bordered flex items-center gap-4'>
                <RiKey2Fill size={20} />
                <input
                  onChange={onChangeHandler}
                  id='password'
                  name='password'
                  value={formData.password}
                  type={`${showPassword ? "text" : "password"}`}
                  className="grow"
                  placeholder="********" />
                {
                  showPassword
                    ? <RiEyeOffLine className='cursor-pointer hover:text-white' onClick={() => setShowPassword(prev => !prev)} size={17} />
                    : <RiEyeLine className='cursor-pointer hover:text-white' onClick={() => setShowPassword(prev => !prev)} size={17} />
                }
              </div>
            </div>

            <div className='mt-6'>
              <button className='btn w-full hover:text-white' disabled={isSigningUp}>
                {isSigningUp ? "Loading..." : "Create Account"}
              </button>
            </div>
          </div>
        </form>

        <div className='mt-4 text-sm'>
          Already Have an Account ? <span onClick={() => navigate("/login")} className='text-[%a6adbb] cursor-pointer hover:underline'>Login Here</span>
        </div>
      </div>

      {/* rigth side */}
      <div className='hidden lg:flex justify-center items-center'>
        <img className='max-w-lg' src={Hero} alt="" />
      </div>
    </div>
  )
}

export default SignupPage
