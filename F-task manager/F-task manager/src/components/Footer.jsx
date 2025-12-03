import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-8 py-6">
      <div className="max-w-6xl mx-auto text-center text-sm text-slate-600">
        © {new Date().getFullYear()} TaskFlow — Built with Firebase and React
      </div>
    </footer>
  )
}
