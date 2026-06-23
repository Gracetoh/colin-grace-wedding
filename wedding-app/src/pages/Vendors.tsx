import { useTable } from '../lib/useTable'
import type { Vendor } from '../lib/types'
import { PageHeader, Card, Btn, EditableCell } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, Phone } from 'lucide-react'

export default function Vendors() {
  const { isOwner } = useAuth()
  const { rows, update, insert, remove } = useTable<Vendor>('vendors')

  return (
    <div>
      <PageHeader
        title="Vendors"
        subtitle="Contacts for everyone helping on the day"
        action={isOwner && <Btn onClick={() => insert({ company: 'New vendor', sort: rows.length } as Partial<Vendor>)}><Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add vendor</Btn>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((v) => (
          <Card key={v.id} className="p-4">
            {isOwner ? <EditableCell value={v.company} onSave={(x) => update(v.id, { company: x })} className="font-semibold text-base" /> : <div className="font-semibold text-base px-2 py-1">{v.company}</div>}
            <div className="text-xs text-blush-500 font-semibold px-2 mb-2">{isOwner ? <EditableCell value={v.category} onSave={(x) => update(v.id, { category: x })} /> : v.category}</div>

            <div className="space-y-1 text-sm">
              <Line label="Contact" value={v.contact_person} editable={isOwner} onSave={(x) => update(v.id, { contact_person: x })} />
              <Line label="Mobile" value={v.mobile} editable={isOwner} onSave={(x) => update(v.id, { mobile: x })} phone />
              <Line label="Arrival" value={v.arrival_time} editable={isOwner} onSave={(x) => update(v.id, { arrival_time: x })} />
            </div>
            {v.notes && <p className="text-xs text-gray-400 mt-2 px-2 whitespace-pre-line">{v.notes}</p>}
            {isOwner && <div className="text-right mt-1"><button onClick={() => remove(v.id)} className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>}
          </Card>
        ))}
      </div>
      {rows.length === 0 && <p className="text-center text-gray-400 py-10">No vendors yet.</p>}
    </div>
  )
}

function Line({ label, value, editable, onSave, phone }: { label: string; value: string | null; editable: boolean; onSave: (v: string) => void; phone?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-gray-400 w-14 shrink-0">{label}</span>
      {editable ? <EditableCell value={value} onSave={onSave} /> : phone && value ? <a href={`tel:${value}`} className="text-blush-600 font-semibold flex items-center gap-1 px-2 py-1"><Phone className="w-3.5 h-3.5" />{value}</a> : <span className="px-2 py-1 text-gray-600">{value || '—'}</span>}
    </div>
  )
}
