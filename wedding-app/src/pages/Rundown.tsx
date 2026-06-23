import { useTable } from '../lib/useTable'
import type { RundownItem } from '../lib/types'
import { PageHeader, Card, Btn, EditableCell } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2 } from 'lucide-react'

const STATUS = ['Pending', 'In-Progress', 'Done']
const style = (s: string) => (s === 'Done' ? 'bg-emerald-100 text-emerald-700' : s === 'In-Progress' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500')

export default function Rundown() {
  const { isOwner } = useAuth()
  const { rows, update, insert, remove } = useTable<RundownItem>('rundown')

  return (
    <div>
      <PageHeader
        title="Run Sheet"
        subtitle="The minute-by-minute timeline for the day"
        action={isOwner && <Btn onClick={() => insert({ time: '', activity: 'New moment', status: 'Pending', sort: rows.length } as Partial<RundownItem>)}><Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add row</Btn>}
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="bg-blush-50/60 text-left text-xs uppercase tracking-wide text-blush-700">
                <th className="px-3 py-2.5 w-20">Time</th>
                <th className="px-2 py-2.5">Activity</th>
                <th className="px-2 py-2.5 w-32">Location</th>
                <th className="px-2 py-2.5 w-32">Person</th>
                <th className="px-2 py-2.5 w-28 text-center">Status</th>
                {isOwner && <th className="px-2 py-2.5 w-8"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-blush-50/30">
                  <td className="px-2 py-1 font-semibold text-blush-600">{isOwner ? <EditableCell value={r.time} onSave={(v) => update(r.id, { time: v })} /> : <span className="px-2">{r.time}</span>}</td>
                  <td className="px-2 py-1">{isOwner ? <EditableCell value={r.activity} onSave={(v) => update(r.id, { activity: v })} /> : <span className="px-2">{r.activity}</span>}</td>
                  <td className="px-2 py-1 text-gray-600">{isOwner ? <EditableCell value={r.location} onSave={(v) => update(r.id, { location: v })} /> : <span className="px-2">{r.location}</span>}</td>
                  <td className="px-2 py-1 text-gray-600">{isOwner ? <EditableCell value={r.person} onSave={(v) => update(r.id, { person: v })} /> : <span className="px-2">{r.person}</span>}</td>
                  <td className="px-2 py-1 text-center">
                    <select value={STATUS.includes(r.status || '') ? r.status! : 'Pending'} onChange={(e) => update(r.id, { status: e.target.value })} className={`text-xs font-semibold rounded-full px-2 py-1 border-0 outline-none cursor-pointer ${style(r.status || '')}`}>
                      {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  {isOwner && <td className="px-2 py-1"><button onClick={() => remove(r.id)} className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
