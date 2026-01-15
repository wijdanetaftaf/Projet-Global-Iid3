import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Rules(){
  const [rules, setRules] = useState<any[]>([])
  const [name, setName] = useState('')
  const [expr, setExpr] = useState('')
  useEffect(()=>{ api.get('/rules').then(r=>setRules(r.data.rules || [])) }, [])
  const add = async ()=>{
    const res = await api.post('/rules', { name, expression: expr, explanation: 'User rule' })
    setRules((s)=>[...s, res.data])
    setName(''); setExpr('')
  }
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Knowledge Engineering — Rules</h1>
      <div className="card mb-4">
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Rule name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded" />
          <input placeholder="Expression (e.g. temp>42 && days>=3)" value={expr} onChange={e=>setExpr(e.target.value)} className="border p-2 rounded" />
        </div>
        <div className="mt-3 text-right">
          <button onClick={add} className="px-3 py-1 bg-primary text-white rounded">Add Rule</button>
        </div>
      </div>
      <div className="space-y-3">
        {rules.map(r=> (
          <div key={r.id} className="card flex justify-between items-center">
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-slate-500">{r.expression}</div>
            </div>
            <div className="text-sm">{r.active ? <span className="text-green-500">Active</span> : <span className="text-slate-400">Inactive</span>}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
