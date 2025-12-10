import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, provider } from '../../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

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

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider).then((res)=>{
      console.log(res)
      setDoc(doc(db, 'Users', res.user.uid), {name: res.user.displayName, email: res.user.email, photo: res.user.photoURL})
      navigate('/deskboard')
    })
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md glass-card p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Welcome back</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input type="email" name="email" placeholder="you@example.com" onChange={handlechange} className="input" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" onChange={handlechange} className="input" />
          </div>

          <button onClick={handleLogin} className="w-full btn-primary">Continue</button>

          <p className="text-sm text-slate-600 text-center">Don't have an account? <Link to="/" className="text-indigo-600 underline">Register</Link></p>
        </div>

        <div className="mt-4">
          <button onClick={handleSignIn} className="w-full btn-ghost">Continue with Google</button>
        </div>
      </div>
    </div>
  )
}
