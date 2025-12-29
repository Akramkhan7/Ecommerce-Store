import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Login = () => {

  const {token, setToken, backendUrl} = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    try{
      if(currentState === 'Sign Up'){

        const response = await axios.post(backendUrl + '/api/user/register', {email,password,name});
        console.log(response.data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.error)
        }
      }else{
        const response = await axios.post(backendUrl + '/api/user/login', {email,password});
        console.log("FULL RESPONSE:", response.data);
console.log("SUCCESS VALUE:", response.data.success, typeof response.data.success);

        console.log(response.data);

         if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
          navigate("/");
         
         
        }else{
          toast.error(response.data.msg);   
           console.log(" not Loging....")
        }

      }
    }catch(err){
      toast.error(err.message)
      console.log(err);
    }
  }

  useEffect(()=>{
    if(token){
      navigate("/");
    }
  },[token])

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
          onChange={(e)=>setName(e.target.value)}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          value={name}
          placeholder='Your Name'
        />
      )}

      <input
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        value={email}
        placeholder='Email'
      />

      <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
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

      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>
        {currentState}
      </button>
    </form>
  );
};


export default Login
