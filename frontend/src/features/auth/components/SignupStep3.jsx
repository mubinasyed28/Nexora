import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUserAsync } from '../authSlice';
import { Navigate } from 'react-router';

function SignupStep3({ userData }) {
    const [form, setForm] = useState({ fullName: "", phoneNumber: ""});
    const dispatch = useDispatch();
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const finalData = { ...userData, ...form };
        const res = await dispatch(createUserAsync({fullName: form.fullName, phoneNumber: form.phoneNumber}));
        if (res.meta.requestStatus === "fulfilled") {
          setSignupSuccess(true);
        }
      };

      if (signupSuccess) {
        return <Navigate to="/" replace={true} />;
      }
  return (
    <>
    <div className='h-fit w-3/4 bg-white flex flex-col justify-center items-center rounded-3xl lg:w-2/5 py-4'>
        <form 
            onSubmit={handleSubmit} 
            className='h-full w-full flex flex-col justify-evenly items-center'>
          <div className='text-xl font-bold md:text-4xl lg:text-3xl lg:mt-2 mb-4'>CREATE ACCOUNT</div>

                <div className='w-11/12 px-4 py-1 font-medium mb-4'>
                    <div className='text-sm px-3 md:text-xl'>Enter Full Name</div>
                    <input 
                    className='w-full mt-2 h-8 text-sm pl-3 py-4 rounded-3xl border md:h-12 md:text-2xl lg:text-xl lg:h-10'
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    type='text' 
                    placeholder='Full Name'/>
                </div>

                <div className='w-11/12 px-4 py-1 font-medium'>
                    <div className='text-sm px-3 md:text-xl'>Enter Phone Number</div>
                    <input 
                    className='w-full mt-2 h-8 text-sm pl-3 py-4 rounded-3xl border md:h-12 md:text-2xl lg:text-xl lg:h-10'
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    type='text' 
                    placeholder='Phone Number'/>
                </div>

                <button className='text-white cursor-pointer h-auto w-2/4 text-lg font-bold bg-orange-500 mt-2 px-2 py-1 md:py-2 rounded-3xl md:text-3xl md:mt-4 lg:text-2xl lg:py-1 lg:w-1/3'>
                  Sign Up
                </button>
            </form>
        </div>
    </>
  )
}

export default SignupStep3