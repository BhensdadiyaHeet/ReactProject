import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Deskboard from './components/Deskboard'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Register}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/deskboard' Component={Deskboard}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
