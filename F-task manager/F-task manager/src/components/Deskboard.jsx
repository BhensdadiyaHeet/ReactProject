import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useMemo, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Deskboard() {
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const [task, setTask] = useState("")
  const [priority, setPriority] = useState("")
  const [record, setRecord] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
        setUserData(null)
        navigate('/')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (userId) {
      fetchUser()
      fetchData()
    }
  }, [userId])

  const fetchUser = async () => {
    try {
      const res = await getDoc(doc(db, "Users", userId))
      setUserData(res.data())
    } catch (err) {
      console.error(err)
    }
  }

  const fetchData = async () => {
    try {
      let allData = await getDocs(collection(db, "Todos"))
      let newData = allData.docs.map((data) => ({
        docId: data.id,
        ...data.data()
      }))
      setRecord(newData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleTask = async () => {
    if (!task.trim()) return;
    const obj = { uid: userId, Task: task, priourity: priority }
    try {
      if (editIndex == null) {
        await addDoc(collection(db, "Todos"), obj)
      } else {
        await updateDoc(doc(db, "Todos", editIndex), { Task: task, priourity: priority })
      }
      setTask("")
      setPriority("")
      setEditIndex(null)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Todos", id))
    fetchData()
  }

  const handleEdit = (id) => {
    let singleData = record.find((item) => item.docId == id)
    setTask(singleData.Task)
    setPriority(singleData.priourity)
    setEditIndex(id)
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  const summary = useMemo(() => {
    const total = record.length
    const high = record.filter(item => item.priourity?.toLowerCase() === 'high').length
    const medium = record.filter(item => item.priourity?.toLowerCase() === 'medium').length
    const low = record.filter(item => item.priourity?.toLowerCase() === 'low' || !item.priourity).length
    return { total, high, medium, low }
  }, [record])

  return (
    <div className="min-h-screen app-container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Welcome{userData?.name ? `, ${userData.name}` : ''}</h1>
            {/* <img src={userData && userData.photo} alt="" /> */}
            <img src={userData?.photo ? userData.photo : "https://img.freepik.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80"} alt="" />
            <p className="text-sm text-slate-600">Simple task list</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-700">Tasks: {summary.total}</div>
            <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Log out</button>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex gap-3">
            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New task" className="flex-1 border rounded px-3 py-2" />
            <input value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority (High/Medium/Low)" className="w-48 border rounded px-3 py-2" />
            <button onClick={handleTask} className="bg-indigo-600 text-white px-4 rounded">{editIndex ? 'Save' : 'Add'}</button>
          </div>
        </div>

        <div className="space-y-3">
          {record.length === 0 ? (
            <div className="text-center text-slate-600">No tasks yet. Add one above.</div>
          ) : (
            record.map((item) => (
              <div key={item.docId} className="card p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">{item.Task}</div>
                  <div className="text-xs text-slate-600">{item.priourity || 'Low'}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item.docId)} className="text-sm px-3 py-1 border rounded">Edit</button>
                  <button onClick={() => handleDelete(item.docId)} className="text-sm px-3 py-1 border rounded text-red-600">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}