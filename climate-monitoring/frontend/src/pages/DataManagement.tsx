import React, { useState } from 'react'
import api from '../services/api'

export default function DataManagement(){
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<any>(null)
  const upload = async ()=>{
    if(!file) return
    const fd = new FormData(); fd.append('file', file)
    const res = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setPreview(res.data.metadata)
  }
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Data Management</h1>
      <div className="card">
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <div className="mt-3">
          <button onClick={upload} className="px-3 py-1 bg-primary text-white rounded">Upload CSV (mock)</button>
        </div>
      </div>
      {preview && (
        <div className="card mt-4">
          <div><strong>Filename:</strong> {preview.filename}</div>
          <div><strong>Rows:</strong> {preview.preview.rowCount}</div>
          <div><strong>Columns:</strong> {preview.preview.columns.join(', ')}</div>
        </div>
      )}
    </div>
  )
}
