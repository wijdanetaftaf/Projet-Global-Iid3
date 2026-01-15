import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Predictions(){
  const [data, setData] = useState<any[]>([])
  useEffect(()=>{ api.get('/predictions').then(r=>setData(r.data.results || [])) }, [])
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Predictions & Alerts</h1>
      <div className="card overflow-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-slate-500">
            <tr><th>Type</th><th>Region</th><th>Severity</th><th>Confidence</th><th>Window</th></tr>
          </thead>
          <tbody>
            {data.map((d:any)=> (
              <tr key={d.id} className="border-t">
                <td className="py-2">{d.type}</td>
                <td>{d.region}</td>
                <td>{d.severity}</td>
                <td>{d.confidence}%</td>
                <td>{new Date(d.window.start).toLocaleDateString()} - {new Date(d.window.end).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
