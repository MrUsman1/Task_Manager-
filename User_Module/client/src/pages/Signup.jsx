// Signup.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const submitHandler = async (data) => {
    try {
      const response = await axios.post('/api/signup', data);
      console.log(response.data); // Handle successful signup
      // Optionally, you can dispatch an action or perform any other action upon successful signup
    } catch (error) {
      console.error(error.response.data); // Handle signup error
      setError(error.response.data.message); // Set error message to display to the user
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-gray-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-gray-600 text-3xl font-bold text-center'>
                Sign Up
              </p>
              <p className='text-center text-base text-gray-700'>
                Create an account to manage your tasks.
              </p>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='Username'
                type='text'
                name='username'
                label='Username'
                className='w-full rounded-full'
                register={register('username', {
                  required: 'Username is required!',
                })}
                error={errors.username ? errors.username.message : ''}
              />
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register('email', {
                  required: 'Email Address is required!',
                })}
                error={errors.email ? errors.email.message : ''}
              />
              <Textbox
                placeholder='Your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password ? errors.password.message : ''}
              />
              <Button
                type='submit'
                label='Sign Up'
                className='w-full h-10 bg-gray-500 text-white rounded-full  hover:text-gray-600 hover:underline cursor-pointer'
              />
            </div>
          </form>
          <div className='mt-4'>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <Link to='/log-in' className='text-blue-600 hover:underline'>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;