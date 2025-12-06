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
    await createUserWithEmailAndPassword(auth, formdata.email, formdata.password).then((res) => {
      setDoc(doc(db, "Users", res.user.uid), formdata)
      navigate('/login')
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-10 h-96 w-96 bg-fuchsia-500/40 blur-3xl" />
        <div className="absolute top-32 right-0 h-80 w-80 bg-blue-500/40 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 bg-indigo-500/40 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="lg:w-1/2 p-10 bg-gradient-to-b from-white/10 to-transparent">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Taskflow OS</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
              Build better habits with a calmer task experience
            </h1>
            <p className="mt-4 text-slate-200/80">
              Organize work, track priorities, and celebrate progress inside a single focused workspace.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-100">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                Smart priority highlights and due reminders
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Personal insights for weekly planning
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400" />
                Sync across devices with secure Firebase auth
              </li>
            </ul>
            <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm uppercase tracking-wide text-slate-300 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-400">Avg. completion rate</p>
                <p className="mt-1 text-3xl font-semibold text-white">89%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Teams onboarded</p>
                <p className="mt-1 text-3xl font-semibold text-white">2.1K+</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white text-slate-900 p-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Join today</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Create your workspace</h2>
              <p className="text-sm text-slate-500 mt-1">3 simple fields — you can start shipping in minutes.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Full name</label>
                <input type="text" name="name" placeholder="Jane Productive" onChange={handlechange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Email address</label>
                <input type="email" name="email" placeholder="you@email.com" onChange={handlechange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Password</label>
                <input type="password" name="password" placeholder="Create a secure password" onChange={handlechange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <button onClick={handleRegister} className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:translate-y-0.5 cursor-pointer">
                Create account
              </button>
              <p className="text-center text-sm text-slate-500">
                Already onboard?{" "}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-fuchsia-500 cursor-pointer">Log in instead</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
