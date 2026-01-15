import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    nav('/login')
  }
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold text-primary">Climate Intelligence</div>
          <nav className="space-x-3 hidden md:block">
            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:underline">City Weather</Link>
            <Link to="/rules" className="text-slate-600 dark:text-slate-300 hover:underline">Rules</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => document.documentElement.classList.toggle('dark')} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700">Toggle</button>
          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </header>
  )
}
