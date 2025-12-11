import React from 'react'
import { useState } from 'react';

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');
  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    console.log(e);
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4'>
      
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? (
        ''
      ) : (
        <input
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Your Name'
        />
      )}

      <input
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
      />

      <input
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
      />

      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>Forgot your password?</p>

        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className='cursor-pointer'
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className='cursor-pointer'
          >
            Login here
          </p>
        )}
      </div>

      <button onClick={(e)=>onSubmitHandler(e.target)} className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState}
      </button>
    </form>
  );
};


export default Login
