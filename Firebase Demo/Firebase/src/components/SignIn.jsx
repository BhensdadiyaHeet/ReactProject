import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export default function SignIn() {
  const [formdata, setFormdata] = useState({})
  const navigate = useNavigate()

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSignIn = async () => {
    await createUserWithEmailAndPassword(auth, formdata.email, formdata.password).then((res) => {
      setDoc(doc(db, 'users', res.user.uid), formdata )
      navigate('/')
    })  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
        <div className="space-y-4">
          <input 
            type="text" 
            name='name' 
            placeholder='Enter your name' 
            onChange={handlechange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
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
          <input 
            type="tel" 
            name='number' 
            placeholder='Enter your number' 
            onChange={handlechange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          /> 
          <input 
            type="text" 
            name='city' 
            placeholder='Enter your city' 
            onChange={handlechange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          /> 
          <button 
            onClick={handleSignIn}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg mt-4"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
