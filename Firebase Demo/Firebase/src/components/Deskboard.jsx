/* eslint-disable no-unused-vars */
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Deskboard() {

  const [userId,setUserId] = useState(null)
  const [userData,setUserData] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUserId(user.uid)
    })
  },[])

  useEffect(()=>{
    if(userId){
      fetchuser()
    }
  },[userId])   


  const fetchuser = async()=>{
    await getDoc(doc(db,'users',userId)).then((res)=>{
      setUserData(res.data())
    })
  }


  const handlelogout = async ()=>{
    await auth.signOut()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <button 
              onClick={handlelogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200 shadow-md hover:shadow-lg"
            >
              Log Out
            </button>
          </div>
          
          {userData && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.name && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
                  </div>
                )}
                {userData.email && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
                  </div>
                )}
                {userData.number && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.number}</p>
                  </div>
                )}
                {userData.city && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">City</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.city}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!userData && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading user data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
