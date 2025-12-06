import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { doc, setDoc, getDoc } from 'firebase/firestore'

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
    await signInWithEmailAndPassword(auth, formdata.email, formdata.password).then((res) => {
      navigate('/deskboard')
    })
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid))
      
      // If user doesn't exist, create a new document
      if (!userDoc.exists()) {
        await setDoc(doc(db, "Users", user.uid), {
          name: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email
        })
      }
      
      navigate('/deskboard')
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -right-10 -top-20 h-96 w-96 rounded-full bg-sky-500/50 blur-3xl" />
        <div className="absolute left-20 top-20 h-64 w-64 rounded-full bg-violet-500/40 blur-3xl" />
        <div className="absolute bottom-0 right-32 h-72 w-72 rounded-full bg-blue-400/40 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid items-center gap-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Welcome back</p>
            <h1 className="text-4xl font-bold leading-tight">Pick up your progress where you left off</h1>
            <p className="text-lg text-slate-200/80">
              Everything you planned, prioritized, or postponed is synced. Drop back into focus mode in seconds.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Weekly streak</p>
                <p className="mt-2 text-3xl font-semibold">7 days</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Tasks completed</p>
                <p className="mt-2 text-3xl font-semibold">142</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-10 text-slate-900 shadow-2xl">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Log in</p>
              <h2 className="mt-2 text-3xl font-bold">Access your deskboard</h2>
              <p className="text-sm text-slate-500 mt-1">Secure Firebase auth keeps your tasks in sync everywhere.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Email address</label>
                <input type="email" name="email" placeholder="you@email.com" onChange={handlechange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Password</label>
                <input type="password" name="password" placeholder="••••••••••" onChange={handlechange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100" />
              </div>
              <button onClick={handleLogin} className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-0.5 cursor-pointer">
                Continue to deskboard
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleLogin} 
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 shadow-md transition hover:bg-slate-50 hover:shadow-lg cursor-pointer flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/" className="font-semibold text-indigo-600 hover:text-fuchsia-500 cursor-pointer">Create one now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
