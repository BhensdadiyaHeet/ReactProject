import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-slate-800 font-bold text-xl">TaskFlow</Link>
        <nav className="flex gap-4">
          <Link to="/login" className="text-slate-600 hover:text-slate-800">Log in</Link>
          <Link to="/" className="text-slate-600 hover:text-slate-800">Register</Link>
          <Link to="/deskboard" className="text-slate-600 hover:text-slate-800">Deskboard</Link>
        </nav>
      </div>
    </header>
  )
}
