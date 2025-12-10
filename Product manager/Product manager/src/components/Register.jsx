import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export default function Register() {

  const [formdata, setFormdata] = useState({})
  const navigate = useNavigate()

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
      await setDoc(doc(db, "Users", res.user.uid), formdata)
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Registration failed.')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md glass-card p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Create account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Full name</label>
            <input type="text" name="name" placeholder="Jane Productive" onChange={handlechange} className="input" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input type="email" name="email" placeholder="you@example.com" onChange={handlechange} className="input" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Password</label>
            <input type="password" name="password" placeholder="Create a password" onChange={handlechange} className="input" />
          </div>

          <button onClick={handleRegister} className="w-full btn-primary">Create account</button>

          <p className="text-sm text-slate-600 text-center">Already onboard? <Link to="/login" className="text-indigo-600 underline">Log in</Link></p>
        </div>
      </div>
    </div>
  )
}
