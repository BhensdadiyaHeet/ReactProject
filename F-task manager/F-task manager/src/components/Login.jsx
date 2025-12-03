import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export default function Login() {
  const [formdata, setFormdata] = useState({})
  const navigate = useNavigate()

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, formdata.email, formdata.password)
      navigate('/deskboard')
    } catch (err) {
      console.error(err)
      alert('Login failed. Check credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center app-container">
      <div className="w-full max-w-md card p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Log in</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input type="email" name="email" placeholder="you@example.com" onChange={handlechange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" onChange={handlechange} className="w-full border rounded px-3 py-2" />
          </div>

          <button onClick={handleLogin} className="w-full bg-indigo-600 text-white rounded px-3 py-2">Continue</button>

          <p className="text-sm text-slate-600 text-center">Don't have an account? <Link to="/" className="text-indigo-600 underline">Register</Link></p>
        </div>
      </div>
    </div>
  )
}
