import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001'

const api = axios.create({ baseURL: API_BASE })

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` }
  return cfg
})

export default api
