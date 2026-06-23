import { useTable } from '../lib/useTable'
import type { Poc } from '../lib/types'
import { PageHeader, Card, Btn, EditableCell } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, Phone } from 'lucide-react'

export default function PocPage() {
  const { isOwner } = useAuth()
  const { rows, update, insert, remove } = useTable<Poc>('pocs')

  return (
    <div>
      <PageHeader
        title="Points of Contact"
        subtitle="Who is responsible for what on the day — everyone can see this"
        action={isOwner && <Btn onClick={() => insert({ task: 'New duty', sort: rows.length } as Partial<Poc>)}><Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add duty</Btn>}
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {rows.map((p) => (
          <Card key={p.id} className={`p-4 ${p.done ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {isOwner ? (
                  <EditableCell value={p.task} onSave={(v) => update(p.id, { task: v })} className="font-semibold text-base" />
                ) : (
                  <div className="font-semibold px-2 py-1">{p.task}</div>
                )}
              </div>
              <button
                onClick={() => update(p.id, { done: !p.done })}
                className={`shrink-0 w-6 h-6 rounded-md border-2 grid place-items-center ${p.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-blush-200'}`}
              >
                {p.done && '✓'}
              </button>
            </div>

            <div className="mt-2 space-y-1.5 text-sm">
              <Field label="POC" value={p.poc_name} onSave={(v) => update(p.id, { poc_name: v })} editable={isOwner} bold />
              <Field label="Phone" value={p.poc_phone} onSave={(v) => update(p.id, { poc_phone: v })} editable={isOwner} phone />
              <Field label="Backup" value={p.backup_name} onSave={(v) => update(p.id, { backup_name: v })} editable={isOwner} />
              <Field label="Location" value={p.location} onSave={(v) => update(p.id, { location: v })} editable={isOwner} />
              <Field label="Time" value={p.time_needed} onSave={(v) => update(p.id, { time_needed: v })} editable={isOwner} />
            </div>

            {isOwner && (
              <div className="mt-2 text-right">
                <button onClick={() => remove(p.id)} className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </Card>
        ))}
      </div>
      {rows.length === 0 && <p className="text-center text-gray-400 py-10">No duties assigned yet.</p>}
    </div>
  )
}

function Field({ label, value, onSave, editable, bold, phone }: { label: string; value: string | null; onSave: (v: string) => void; editable: boolean; bold?: boolean; phone?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-gray-400 w-16 shrink-0">{label}</span>
      {editable ? (
        <EditableCell value={value} onSave={onSave} className={bold ? 'font-semibold' : ''} />
      ) : phone && value ? (
        <a href={`tel:${value}`} className="text-blush-600 font-semibold flex items-center gap-1 px-2 py-1"><Phone className="w-3.5 h-3.5" />{value}</a>
      ) : (
        <span className={`px-2 py-1 ${bold ? 'font-semibold' : 'text-gray-600'}`}>{value || '—'}</span>
      )}
    </div>
  )
}
