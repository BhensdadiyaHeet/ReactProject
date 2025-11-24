import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Deskboard from './components/Deskboard'
import SignIn from './components/SignIn'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login}></Route>
          <Route path='/SignIn' Component={SignIn}></Route>
          <Route path='/deskboard' Component={Deskboard}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
