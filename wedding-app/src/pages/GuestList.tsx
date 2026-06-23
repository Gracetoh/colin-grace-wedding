import { useMemo, useState } from 'react'
import { useTable } from '../lib/useTable'
import type { Guest, Table } from '../lib/types'
import { PageHeader, Card, Btn, Pill, EditableCell, Stat } from '../components/ui'
import { Plus, Trash2, Search, Download } from 'lucide-react'

const RSVP_OPTS = ['pending', 'yes', 'no'] as const
const rsvpColor = (v: string) => (v === 'yes' ? 'green' : v === 'no' ? 'red' : 'amber')

export default function GuestList() {
  const { rows: guests, update, insert, remove } = useTable<Guest>('guests')
  const { rows: tables } = useTable<Table>('tables')
  const [q, setQ] = useState('')
  const [groupFilter, setGroupFilter] = useState('all')
  const [rsvpFilter, setRsvpFilter] = useState('all')

  const groups = useMemo(
    () => Array.from(new Set(guests.map((g) => g.invitation_group).filter(Boolean))).sort() as string[],
    [guests]
  )

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (q && !(g.full_name || '').toLowerCase().includes(q.toLowerCase())) return false
      if (groupFilter !== 'all' && g.invitation_group !== groupFilter) return false
      if (rsvpFilter !== 'all' && g.rsvp_banquet !== rsvpFilter) return false
      return true
    })
  }, [guests, q, groupFilter, rsvpFilter])

  const tableLabel = (id: string | null) => tables.find((t) => t.id === id)?.label || ''

  const addGuest = () =>
    insert({ full_name: 'New guest', age_group: 'Adult', rsvp_rom: 'pending', rsvp_banquet: 'pending', sort: guests.length } as Partial<Guest>)

  const exportCsv = () => {
    const head = ['Name', 'Age', 'Guest of', 'Group', 'Table', 'Dietary', 'ROM', 'Banquet', 'Gift?', 'Amount']
    const lines = filtered.map((g) =>
      [g.full_name, g.age_group, g.guest_of, g.invitation_group, tableLabel(g.table_id), g.dietary,
       g.rsvp_rom, g.rsvp_banquet, g.gift_received ? 'Y' : '', g.gift_amount]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')
    )
    const blob = new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'guest-list.csv'
    a.click()
  }

  const banquetYes = guests.filter((g) => g.rsvp_banquet === 'yes').length
  const romYes = guests.filter((g) => g.rsvp_rom === 'yes').length
  const pending = guests.filter((g) => g.rsvp_banquet === 'pending').length

  return (
    <div>
      <PageHeader
        title="Guest List"
        subtitle={`${guests.length} invited`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={exportCsv}><Download className="w-4 h-4 inline -mt-0.5 mr-1" />Export</Btn>
            <Btn onClick={addGuest}><Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add guest</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <Stat label="Invited" value={guests.length} />
        <Stat label="Banquet ✓" value={banquetYes} accent="sage" />
        <Stat label="ROM ✓" value={romYes} accent="sage" />
        <Stat label="Pending" value={pending} accent="amber" />
      </div>

      <Card className="p-3 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-blush-200 focus:border-blush-400 outline-none text-sm"
            />
          </div>
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-blush-200 text-sm">
            <option value="all">All groups</option>
            {groups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={rsvpFilter} onChange={(e) => setRsvpFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-blush-200 text-sm">
            <option value="all">Any RSVP</option>
            <option value="yes">Banquet: Yes</option>
            <option value="pending">Banquet: Pending</option>
            <option value="no">Banquet: No</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="bg-blush-50/60 text-left text-xs uppercase tracking-wide text-blush-700">
                <th className="px-3 py-2.5 font-semibold">Name</th>
                <th className="px-2 py-2.5 font-semibold">Guest of</th>
                <th className="px-2 py-2.5 font-semibold">Group</th>
                <th className="px-2 py-2.5 font-semibold">Table</th>
                <th className="px-2 py-2.5 font-semibold">Dietary</th>
                <th className="px-2 py-2.5 font-semibold text-center">ROM</th>
                <th className="px-2 py-2.5 font-semibold text-center">Banquet</th>
                <th className="px-2 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-blush-50/30">
                  <td className="px-2 py-1 min-w-[150px]"><EditableCell value={g.full_name} onSave={(v) => update(g.id, { full_name: v })} /></td>
                  <td className="px-2 py-1 w-24"><EditableCell value={g.guest_of} onSave={(v) => update(g.id, { guest_of: v })} /></td>
                  <td className="px-2 py-1"><EditableCell value={g.invitation_group} onSave={(v) => update(g.id, { invitation_group: v })} /></td>
                  <td className="px-2 py-1 w-28">
                    <select
                      value={g.table_id || ''}
                      onChange={(e) => update(g.id, { table_id: e.target.value || null })}
                      className="w-full bg-transparent text-sm px-1 py-1 rounded-lg border border-transparent hover:border-blush-200 outline-none"
                    >
                      <option value="">—</option>
                      {tables.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1 w-28"><EditableCell value={g.dietary} onSave={(v) => update(g.id, { dietary: v })} /></td>
                  <td className="px-2 py-1 text-center">
                    <RsvpSelect value={g.rsvp_rom} onChange={(v) => update(g.id, { rsvp_rom: v })} />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <RsvpSelect value={g.rsvp_banquet} onChange={(v) => update(g.id, { rsvp_banquet: v })} />
                  </td>
                  <td className="px-2 py-1">
                    <button onClick={() => remove(g.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No guests match your filters.</p>}
      </Card>
    </div>
  )
}

function RsvpSelect({ value, onChange }: { value: string; onChange: (v: any) => void }) {
  return (
    <div className="inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer outline-none appearance-none text-center ${
          value === 'yes' ? 'bg-emerald-100 text-emerald-700' : value === 'no' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
        }`}
      >
        {RSVP_OPTS.map((o) => <option key={o} value={o}>{o === 'yes' ? '✓ Yes' : o === 'no' ? '✗ No' : 'Pending'}</option>)}
      </select>
    </div>
  )
}
