import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useMemo, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const [Task, setTask] = useState("")
  const [priourity, setPriourity] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [record, setRecord] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

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
    await getDoc(doc(db, "Users", userId)).then((res) => {
      setUserData(res.data());
    });
  };

  const fetchData = async () => {
    let allData = await getDocs(collection(db, "Todos"))
    let newData = allData.docs.map((data) => ({
      docId: data.id,
      ...data.data()
    }))
    // Filter only current user's tasks
    const userTasks = newData.filter(item => item.uid === userId)
    setRecord(userTasks)
  }

  const handleTask = async () => {
    if (!Task.trim() || !priourity.trim()) return;
    if (editIndex == null) {
      const obj = { 
        uid: userId, 
        Task, 
        priourity,
        description: description || "",
        dueDate: dueDate || "",
        category: category || "General",
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await addDoc(collection(db, "Todos"), obj);
    }
    else {
      const existingTask = record.find(item => item.docId === editIndex);
      await updateDoc(doc(db, "Todos", editIndex), {
        Task,
        priourity,
        description: description || "",
        dueDate: dueDate || "",
        category: category || "General",
        completed: existingTask?.completed || false,
        updatedAt: new Date().toISOString()
      });
    }
    setTask("");
    setPriourity("");
    setDescription("");
    setDueDate("");
    setCategory("");
    setEditIndex(null);
    fetchData();
  }

  const handleToggleComplete = async (id, currentStatus) => {
    await updateDoc(doc(db, "Todos", id), {
      completed: !currentStatus,
      updatedAt: new Date().toISOString()
    });
    fetchData();
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Todos", id));
    fetchData();
  }

  const handleEdit = (id) => {
    let singleData = record.find((item) => item.docId == id);
    setTask(singleData.Task || "")
    setPriourity(singleData.priourity || "")
    setDescription(singleData.description || "")
    setDueDate(singleData.dueDate || "")
    setCategory(singleData.category || "")
    setEditIndex(id);
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  const summary = useMemo(() => {
    const total = record.length
    const completed = record.filter(item => item.completed === true).length
    const pending = record.filter(item => !item.completed).length
    const high = record.filter(item => item.priourity?.toLowerCase() === 'high' && !item.completed).length
    const medium = record.filter(item => item.priourity?.toLowerCase() === 'medium' && !item.completed).length
    const low = record.filter(item => (item.priourity?.toLowerCase() === 'low' || !item.priourity) && !item.completed).length
    return { total, completed, pending, high, medium, low }
  }, [record])

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...record]

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.Task?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter(item => 
        item.priourity?.toLowerCase() === filterPriority.toLowerCase()
      )
    }

    // Status filter
    if (filterStatus === "completed") {
      filtered = filtered.filter(item => item.completed === true)
    } else if (filterStatus === "pending") {
      filtered = filtered.filter(item => !item.completed)
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0)
        const dateB = new Date(b.createdAt || b.updatedAt || 0)
        return dateB - dateA
      })
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0)
        const dateB = new Date(b.createdAt || b.updatedAt || 0)
        return dateA - dateB
      })
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      filtered.sort((a, b) => {
        const aPriority = priorityOrder[a.priourity?.toLowerCase()] || 0
        const bPriority = priorityOrder[b.priourity?.toLowerCase()] || 0
        return bPriority - aPriority
      })
    } else if (sortBy === "dueDate") {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    }

    return filtered
  }, [record, searchQuery, filterPriority, filterStatus, sortBy])

  const getPriorityTheme = (value) => {
    const priority = value?.toLowerCase()
    if (priority === 'high') return 'border-rose-500/30 bg-rose-500/10 text-rose-200'
    if (priority === 'medium') return 'border-amber-400/30 bg-amber-400/10 text-amber-200'
    if (priority === 'low') return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
    return 'border-slate-400/30 bg-slate-400/10 text-slate-200'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-32 -left-6 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/40 blur-3xl" />
        <div className="absolute top-10 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-10">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Deskboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Welcome back, {userData?.name || 'maker'} ✷</h1>
            <p className="mt-2 text-slate-200/80">Here’s a quick snapshot of your personal operating system.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Total</p>
              <p className="text-2xl font-semibold">{summary.total}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Done</p>
              <p className="text-2xl font-semibold text-emerald-100">{summary.completed}</p>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-5 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Pending</p>
              <p className="text-2xl font-semibold text-amber-100">{summary.pending}</p>
            </div>
            <button onClick={handleLogout} className="rounded-2xl border border-white/20 bg-gradient-to-r from-rose-500 to-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 cursor-pointer">
              Log out
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-300">{editIndex ? 'Update Task' : 'Add new task'}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{editIndex ? 'Keep refining the plan.' : 'Drop a task into the queue.'}</h2>
              </div>
              {editIndex && (
                <button onClick={() => {
                  setEditIndex(null);
                  setTask("");
                  setPriourity("");
                  setDescription("");
                  setDueDate("");
                  setCategory("");
                }} className="text-xs font-semibold text-slate-300 underline-offset-2 hover:text-white">
                  Cancel edit
                </button>
              )}
            </div>
            <div className="mt-8 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Task Title *</label>
                <input type="text" value={Task} onChange={(e) => setTask(e.target.value)} placeholder='Enter task title' name='task' className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Add task details...' rows="3" className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30 resize-none" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Priority *</label>
                  <select value={priourity} onChange={(e) => setPriourity(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-fuchsia-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30">
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Due Date</label>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-indigo-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Category</label>
                  <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Work / Personal / etc' className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
                </div>
              </div>
            </div>
            <button onClick={handleTask} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 cursor-pointer">
              {editIndex == null ? "Push to stack" : "Save changes"}
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-xl shadow-xl space-y-6">
            <h3 className="text-sm uppercase tracking-[0.4em] text-slate-400">Live pulse</h3>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs text-slate-300">Total Tasks</p>
                <p className="mt-1 text-3xl font-semibold text-white">{summary.total}</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <p className="text-xs text-emerald-200">Completed</p>
                <p className="mt-1 text-3xl font-semibold text-emerald-100">{summary.completed}</p>
              </div>
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-200">Pending</p>
                <p className="mt-1 text-3xl font-semibold text-amber-100">{summary.pending}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs text-slate-300">High priority</p>
                <p className="mt-1 text-3xl font-semibold text-white">{summary.high}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs text-slate-300">Medium</p>
                <p className="mt-1 text-3xl font-semibold text-white">{summary.medium}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs text-slate-300">Low priority</p>
                <p className="mt-1 text-3xl font-semibold text-white">{summary.low}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-100">
              <p className="text-sm font-semibold">Progress</p>
              <p className="text-xs text-emerald-50/80 mt-1">
                {summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0}% complete
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-300">Task Manager</p>
              <h3 className="text-3xl font-semibold text-white mt-2">All Tasks ({filteredAndSortedTasks.length})</h3>
            </div>

            {/* Search and Filters */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300 mb-2 block">Search Tasks</label>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search by title, description, or category..." 
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30" 
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300 mb-2 block">Filter Priority</label>
                <select 
                  value={filterPriority} 
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-fuchsia-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300 mb-2 block">Filter Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-indigo-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-300 mb-2 block">Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-violet-300/50 focus:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority (High to Low)</option>
                <option value="dueDate">Due Date</option>
              </select>
            </div>
          </div>

          {record.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
              <p className="text-lg text-slate-300">You're all caught up. Add your first workflow above.</p>
            </div>
          ) : filteredAndSortedTasks.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
              <p className="text-lg text-slate-300">No tasks match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredAndSortedTasks.map((item, index) => {
                const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.completed
                return (
                  <div 
                    key={item.docId || index} 
                    className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-lg shadow-black/30 transition-all ${
                      item.completed 
                        ? 'border-emerald-500/30 bg-emerald-500/5 opacity-75' 
                        : isOverdue
                        ? 'border-rose-500/30 bg-rose-500/5'
                        : 'border-white/10 bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => handleToggleComplete(item.docId, item.completed)}
                        className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          item.completed 
                            ? 'border-emerald-400 bg-emerald-400' 
                            : 'border-slate-400 hover:border-sky-400'
                        }`}
                      >
                        {item.completed && (
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className={`text-xl font-semibold ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                              {item.Task}
                            </h4>
                            {item.description && (
                              <p className={`mt-1 text-sm ${item.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityTheme(item.priourity)}`}>
                            <span className="h-2 w-2 rounded-full bg-current" />
                            {item.priourity || 'Low'}
                          </span>
                          {item.category && (
                            <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                              {item.category}
                            </span>
                          )}
                          {item.dueDate && (
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                              isOverdue 
                                ? 'border-rose-400/30 bg-rose-500/10 text-rose-200' 
                                : 'border-slate-400/30 bg-slate-400/10 text-slate-200'
                            }`}>
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                              {isOverdue && ' ⚠️'}
                            </span>
                          )}
                          {item.createdAt && (
                            <span className="text-xs text-slate-400">
                              Created: {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => handleEdit(item.docId)} 
                          className="rounded-2xl border border-sky-400/40 px-5 py-2 text-sm font-medium text-sky-100 hover:bg-sky-400/10 cursor-pointer transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item.docId)} 
                          className="rounded-2xl border border-rose-400/40 px-5 py-2 text-sm font-medium text-rose-100 hover:bg-rose-400/10 cursor-pointer transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}