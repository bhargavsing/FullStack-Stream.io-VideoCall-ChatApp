import React from 'react';
import { useState } from 'react';
import { ShipWheelIcon } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { signup } from '../lib/api';
const SignUpPage = () => {

  const [signupData,setSignupData]=React.useState({
    fullName:'',
    email:'',
    password:'',
    
  })

  const queryClient = useQueryClient();



  const {mutate:signupMutation,isPending,error}=useMutation({
   
    mutationFn : signup,
      onSuccess:()=> queryClient.invalidateQueries({queryKey:['authUser']}) //api call to backend
        
  })

  const handleSignup =(e) =>{  // inuse when user submit form
    e.preventDefault();
    signupMutation(signupData);
  }


  return (
    <div className='flex justify-center items-center h-screen p-4 sm:p-6 md:p-8'  data-theme="forest">

      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
      
      {/* left side image */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      {/*logo npm i lucide-react*/ }

      <div className='flex justify-start gap-2 items-center mb-4'>

    <ShipWheelIcon className="size-9 text-primary"/>
    <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
      ChatApp</span>
      </div>

    {error && (
      <div className="alert alert-error mb-4">
        <span>{error.response.data.message}</span> </div>
    )}

   <div className="w-full">
    <form onSubmit={handleSignup}>

<div className="space-y-4">
  <div className="">
        <h2 className='text-2xl font-semibold mb-2'>Create an account</h2>  
        <p className='text-sm opacity-70'>
          Join us today! It takes only a few minutes to create an account and start connecting with others.
        </p>

  </div>
  <div className="space-y-3">
    <div className="form-control w-full">
      <label htmlFor="fullName" className="label">
        <span className="label-text">Full Name</span>
      </label>
      <input
        type="text"
        id="fullName"
        className="input input-bordered w-full"
        placeholder="Enter your full name"
        value={signupData.fullName}
        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
        required
      />
    </div>

     <div className="form-control w-full">
      <label htmlFor="Email" className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="email"
        id="Email"
        className="input input-bordered w-full"
        placeholder="Email@gmail.com"
        value={signupData.email}
        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        required
      />
    </div>

     <div className="form-control w-full">
      <label htmlFor="password" className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        id="password"
        className="input input-bordered w-full"
        placeholder="********"
        value={signupData.password}
        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        required
      /> <p className='text-xs mt-1 opaxity-70'>
        Password must be at least 8 characters long.</p>
    </div>

    <div className="flex items-center space-x-2">
  <input
    id="terms"
    type="checkbox"
    className="checkbox checkbox-sm"
  />
  <label htmlFor="terms" className="text-sm text-gray-300">
    I agree to the{" "}
    <a href="#" className="text-green-500 hover:underline">
      terms of service
    </a>{" "}
    and{" "}
    <a href="#" className="text-green-500 hover:underline">
      privacy policy
    </a>
  </label>
</div>
  </div>

  <button className="btn btn-primary w-full" type="submit">
    
    {isPending ? "Signing Up..." : "Create Account"}
    
    </button>


</div>

    </form>
   </div>
      </div>
      
      {/* right side image */}
<div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
  <div className="max-w-md p-8">
    
    {/* Illustration */}
    <div className="relative aspect-square max-w-sm mx-auto">
      <img
        src="/i.png"
        alt="Language connection illustration"
        className="w-full h-full"
      />
    </div>

    {/* Text content */}
    <div className="text-center space-y-3 mt-6">
      <h2 className="text-xl font-semibold">
        Connect with language partners worldwide
      </h2>
      <p className="opacity-70">
        Practice conversations, make friends, and improve your language skills together
      </p>
    </div>
    
  </div>
</div>




      </div>
    
    </div>
  );
}

export default SignUpPage
