import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Deskboard from './components/Deskboard'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col text-slate-900 relative overflow-hidden">

        <header className="w-full py-4 border-b border-transparent/10">
          <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
            <div className="logo">
              <span className="mark" aria-hidden></span>
              <span>Product<span style={{color:'#06b6d4'}}>Manager</span></span>
            </div>
            <nav className="hidden sm:flex gap-3 items-center">
              <a href="/" className="text-sm text-slate-700">Register</a>
              <a href="/login" className="text-sm text-slate-700">Login</a>
              <a href="/deskboard" className="btn-ghost">Dashboard</a>
            </nav>
          </div>
        </header>

        <div className="relative">
          <div className="hero-decor" style={{background: 'radial-gradient(circle at 20% 20%, #8b5cf6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #06b6d4 0%, transparent 40%)'}}></div>
          <main className="flex-grow">
            <div className="max-w-6xl mx-auto px-5 py-10">
              <Routes>
                <Route path='/' Component={Register}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/deskboard' Component={Deskboard}></Route>
              </Routes>
            </div>
          </main>
        </div>

      </div>
    </BrowserRouter>
  )
}
