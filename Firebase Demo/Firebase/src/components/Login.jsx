/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export default function Login() {
        const [formdata,setFormdata] = useState({})
    const navigate = useNavigate()

    const handlechange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const handleLogin = async()=>{
        await signInWithEmailAndPassword(auth,formdata.email,formdata.password).then((res)=>{
            navigate('/deskboard')
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
        <div className="space-y-4">
          <input 
            type="email" 
            name='email' 
            placeholder='Enter your email' 
            onChange={handlechange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input 
            type="password" 
            name='password' 
            placeholder='Enter your password' 
            onChange={handlechange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/SignIn" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
