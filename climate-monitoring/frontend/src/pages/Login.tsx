import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  onLoginSuccess?: () => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    console.log('Login submit starting', { username })
    try {
      console.log('Attempting to call /auth/login endpoint...')
      const res = await api.post('/auth/login', { username, password })
      console.log('Login response successful:', res.data)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        console.log('Token saved, calling onLoginSuccess...')
        setLoading(false)
        onLoginSuccess?.()
        setTimeout(() => nav('/'), 100)
      } else {
        setError('No token received')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('Login error details:', err)
      console.error('Error response:', err?.response)
      setError(err?.response?.data?.error || err.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-between items-center">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
          <div className="text-sm text-slate-500">Use demo accounts: admin/analyst/viewer</div>
        </div>
      </form>
    </div>
  )
}
