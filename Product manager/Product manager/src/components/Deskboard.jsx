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
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={userData?.photo ? userData.photo : "https://img.freepik.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80"} alt="avatar" className="avatar" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Welcome{userData?.name ? `, ${userData.name}` : ''}</h1>
              <p className="text-sm text-slate-600">Organize your day, ship more products.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-700">Tasks: <strong>{summary.total}</strong></div>
            <button onClick={handleLogout} className="btn-ghost">Log out</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4">
            <div className="text-sm text-slate-600">Total</div>
            <div className="text-2xl font-bold">{summary.total}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-slate-600">High priority</div>
            <div className="text-2xl font-bold text-red-600">{summary.high}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-slate-600">Medium / Low</div>
            <div className="text-2xl font-bold text-amber-700">{summary.medium} / {summary.low}</div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <textarea value={task} onChange={(e) => setTask(e.target.value)} placeholder="Describe the task... (provide useful details so it's clear what to do)" className="flex-1 input" style={{minHeight:120, resize:'vertical'}} />
            <div className="flex flex-col w-full md:w-48 gap-3">
              <input value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority (High/Medium/Low)" className="input" />
              <button onClick={handleTask} className="btn-primary" style={{padding:'0.7rem 1rem'}}>{editIndex ? 'Save' : 'Add task'}</button>
              <button onClick={() => { setTask(''); setPriority(''); setEditIndex(null) }} className="btn-ghost">Clear</button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {record.length === 0 ? (
            <div className="text-center text-slate-600">No tasks yet. Add one above.</div>
          ) : (
            record.map((item) => {
              const pri = (item.priourity || 'Low').toLowerCase();
              const badgeClass = pri === 'high' ? 'priority-high' : pri === 'medium' ? 'priority-medium' : 'priority-low';
              return (
                <div key={item.docId} className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{item.Task}</div>
                    <div className="text-xs text-slate-600">Created by: {item.uid}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`priority-badge ${badgeClass}`}>{item.priourity || 'Low'}</div>
                    <button onClick={() => handleEdit(item.docId)} className="text-sm btn-ghost">Edit</button>
                    <button onClick={() => handleDelete(item.docId)} className="text-sm btn-ghost" style={{color:'#b91c1c'}}>Delete</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}