import { useMemo, useState } from 'react'
import { useTable } from '../lib/useTable'
import type { Guest, Table } from '../lib/types'
import { PageHeader, Card, Stat, Pill } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { Search, Gift, UserCheck } from 'lucide-react'

const money = (n: number) => '$' + n.toLocaleString('en-SG', { maximumFractionDigits: 0 })

export default function DayOf() {
  const { isOwner } = useAuth()
  const { rows: guests, update } = useTable<Guest>('guests')
  const { rows: tables } = useTable<Table>('tables')
  const [q, setQ] = useState('')
  const [tab, setTab] = useState<'all' | 'arrived' | 'pending'>('all')

  const tableLabel = (id: string | null) => tables.find((t) => t.id === id)?.label || '—'

  const list = useMemo(() => {
    return guests
      .filter((g) => g.rsvp_banquet !== 'no') // people who might come
      .filter((g) => !q || (g.full_name || '').toLowerCase().includes(q.toLowerCase()))
      .filter((g) => (tab === 'arrived' ? g.attended_banquet : tab === 'pending' ? !g.attended_banquet : true))
      .sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''))
  }, [guests, q, tab])

  const arrived = guests.filter((g) => g.attended_banquet).length
  const giftCount = guests.filter((g) => g.gift_received).length
  const giftTotal = guests.reduce((s, g) => s + (g.gift_received ? Number(g.gift_amount || 0) : 0), 0)
  const expected = guests.filter((g) => g.rsvp_banquet === 'yes').length

  return (
    <div>
      <PageHeader
        title="Day-Of Tracking"
        subtitle={isOwner ? 'Check guests in & log red packets' : 'Bridal party · check guests in & log red packets'}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Stat label="Checked in" value={`${arrived}/${expected}`} accent="sage" />
        <Stat label="Red packets" value={giftCount} accent="blush" />
        <Stat label="Total received" value={money(giftTotal)} accent="amber" />
        <Stat label="Still to arrive" value={Math.max(0, expected - arrived)} />
      </div>

      <Card className="p-3 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guest…" className="w-full pl-9 pr-3 py-2 rounded-xl border border-blush-200 outline-none text-sm" />
          </div>
          <div className="flex gap-1 p-1 bg-blush-50 rounded-xl">
            {(['all', 'pending', 'arrived'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize ${tab === t ? 'bg-white shadow text-blush-700' : 'text-gray-500'}`}>{t}</button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="divide-y divide-blush-50">
          {list.map((g) => (
            <div key={g.id} className="flex flex-wrap items-center gap-2 px-3 py-2.5 hover:bg-blush-50/30">
              <button
                onClick={() => update(g.id, { attended_banquet: !g.attended_banquet })}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm font-semibold shrink-0 ${g.attended_banquet ? 'bg-sage-500 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                <UserCheck className="w-4 h-4" />
                {g.attended_banquet ? 'Arrived' : 'Check in'}
              </button>

              <div className="flex-1 min-w-[120px]">
                <div className="font-medium">{g.full_name}</div>
                <div className="text-xs text-gray-400">{tableLabel(g.table_id)} · {g.invitation_group}</div>
              </div>

              <button
                onClick={() => update(g.id, { gift_received: !g.gift_received })}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm font-semibold shrink-0 ${g.gift_received ? 'bg-blush-500 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                <Gift className="w-4 h-4" />
                {g.gift_received ? 'Received' : 'Red packet'}
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <span className="text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  defaultValue={g.gift_amount ?? ''}
                  onBlur={(e) => {
                    const v = e.target.value === '' ? null : Number(e.target.value)
                    if (v !== g.gift_amount) update(g.id, { gift_amount: v, gift_received: v ? true : g.gift_received })
                  }}
                  placeholder="0"
                  className="w-20 px-2 py-1.5 rounded-xl border border-blush-200 outline-none text-sm text-right"
                />
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-center text-gray-400 py-8">No guests match.</p>}
        </div>
      </Card>
    </div>
  )
}
