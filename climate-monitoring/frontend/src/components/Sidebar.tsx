import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type MenuItemType = {
  label: string
  path: string
  icon: string
}

const menuItems: MenuItemType[] = [
  { label: 'Dashboard', path: '/', icon: '📊' },
  { label: 'Map & Cities', path: '/map', icon: '🗺️' },
  { label: 'Historical Data', path: '/history', icon: '📈' },
  { label: 'Predictions', path: '/predictions', icon: '🔮' },
  { label: 'Rules', path: '/rules', icon: '⚙️' },
  { label: 'Data Management', path: '/data', icon: '📁' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-700 z-50`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">🌍 Climate</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-slate-700 rounded transition"
        >
          {isOpen ? '<<' : '>>'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded transition hover:bg-slate-700 ${isActive(
              item.path
            )}`}
            title={!isOpen ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded bg-red-600 hover:bg-red-700 transition text-sm"
        >
          <span>🚪</span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
