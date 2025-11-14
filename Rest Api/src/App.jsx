import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import FacebookPage from './components/FacebookPage'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/facebookpage' element={<FacebookPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
