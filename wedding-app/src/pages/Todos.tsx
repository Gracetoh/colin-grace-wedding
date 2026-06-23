import { useMemo, useState } from 'react'
import { useTable } from '../lib/useTable'
import type { Todo } from '../lib/types'
import { PageHeader, Card, Btn, EditableCell } from '../components/ui'
import { Plus, Trash2 } from 'lucide-react'

const STATUS = ['Not Started', 'In-Progress', 'Done']
const statusStyle = (s: string) =>
  s === 'Done' ? 'bg-emerald-100 text-emerald-700' : s === 'In-Progress' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'

export default function Todos() {
  const { rows, update, insert, remove } = useTable<Todo>('todos')
  const [hideDone, setHideDone] = useState(false)

  const phases = useMemo(() => {
    const map = new Map<string, Todo[]>()
    rows.forEach((r) => {
      const p = r.phase || 'Other'
      if (!map.has(p)) map.set(p, [])
      map.get(p)!.push(r)
    })
    return Array.from(map.entries())
  }, [rows])

  const doneCount = rows.filter((r) => (r.status || '').toLowerCase() === 'done').length

  return (
    <div>
      <PageHeader
        title="To-Do List"
        subtitle={`${doneCount} of ${rows.length} done`}
        action={
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500 flex items-center gap-1.5">
              <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> Hide done
            </label>
            <Btn onClick={() => insert({ phase: 'Other', task: 'New task', status: 'Not Started', sort: rows.length } as Partial<Todo>)}>
              <Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add task
            </Btn>
          </div>
        }
      />

      <div className="space-y-4">
        {phases.map(([phase, items]) => {
          const visible = hideDone ? items.filter((i) => (i.status || '').toLowerCase() !== 'done') : items
          if (visible.length === 0) return null
          const done = items.filter((i) => (i.status || '').toLowerCase() === 'done').length
          return (
            <Card key={phase} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl text-blush-700 whitespace-pre-line">{phase}</h3>
                <span className="text-xs text-gray-400">{done}/{items.length} done</span>
              </div>
              <div className="space-y-1.5">
                {visible.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 group">
                    <button
                      onClick={() => update(t.id, { status: (t.status || '').toLowerCase() === 'done' ? 'Not Started' : 'Done' })}
                      className={`w-5 h-5 shrink-0 rounded-md border-2 grid place-items-center ${
                        (t.status || '').toLowerCase() === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-blush-200'
                      }`}
                    >
                      {(t.status || '').toLowerCase() === 'done' && '✓'}
                    </button>
                    <div className="flex-1 min-w-0">
                      <EditableCell
                        value={t.task}
                        onSave={(v) => update(t.id, { task: v })}
                        className={(t.status || '').toLowerCase() === 'done' ? 'line-through text-gray-400' : ''}
                      />
                    </div>
                    {t.priority && <span className="text-[10px] font-bold text-blush-500 px-1.5">{t.priority}</span>}
                    <select
                      value={STATUS.includes(t.status || '') ? t.status! : 'Not Started'}
                      onChange={(e) => update(t.id, { status: e.target.value })}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 outline-none cursor-pointer ${statusStyle(t.status || '')}`}
                    >
                      {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => remove(t.id)} className="p-1 rounded hover:bg-red-50 text-gray-200 group-hover:text-gray-400 hover:!text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
