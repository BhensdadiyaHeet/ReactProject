import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Deskboard from './components/Deskboard'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path='/' Component={Register}></Route>
            <Route path='/login' Component={Login}></Route>
            <Route path='/deskboard' Component={Deskboard}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
