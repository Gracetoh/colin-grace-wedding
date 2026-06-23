import { useTable } from '../lib/useTable'
import type { Guest, BudgetItem, Todo } from '../lib/types'
import { PageHeader, Card, Stat } from '../components/ui'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const money = (n: number) => '$' + n.toLocaleString('en-SG', { maximumFractionDigits: 0 })
const WEDDING = new Date('2026-09-12')

export default function Dashboard() {
  const { profile } = useAuth()
  const { rows: guests } = useTable<Guest>('guests')
  const { rows: budget } = useTable<BudgetItem>('budget_items')
  const { rows: todos } = useTable<Todo>('todos')

  const banquetYes = guests.filter((g) => g.rsvp_banquet === 'yes').length
  const banquetPending = guests.filter((g) => g.rsvp_banquet === 'pending').length
  const seated = guests.filter((g) => g.table_id && g.rsvp_banquet === 'yes').length
  const giftTotal = guests.reduce((s, g) => s + (g.gift_received ? Number(g.gift_amount || 0) : 0), 0)

  const planned = budget.reduce((s, b) => s + Number(b.planned || 0), 0)
  const actual = budget.reduce((s, b) => s + Number(b.actual || 0), 0)
  const paid = budget.reduce((s, b) => s + Number(b.paid || 0), 0)

  const todoDone = todos.filter((t) => (t.status || '').toLowerCase() === 'done').length
  const todoProgress = todos.length ? Math.round((todoDone / todos.length) * 100) : 0

  const daysLeft = Math.max(0, Math.ceil((WEDDING.getTime() - Date.now()) / 86400000))

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${profile?.full_name?.split(' ')[0] || 'love'} 💕`}
        subtitle={`${daysLeft} days until you say "I do"`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Days to go" value={daysLeft} />
        <Stat label="Banquet RSVP ✓" value={banquetYes} accent="sage" />
        <Stat label="Red packets" value={money(giftTotal)} accent="amber" />
        <Stat label="To-do done" value={`${todoProgress}%`} accent="blush" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display text-2xl text-blush-700 mb-3">Guest RSVPs</h3>
          <Row label="Confirmed (banquet)" value={banquetYes} total={guests.length} color="bg-sage-500" />
          <Row label="Pending replies" value={banquetPending} total={guests.length} color="bg-amber-400" />
          <Row label="Seated at a table" value={seated} total={banquetYes} color="bg-blush-500" />
          <Link to="/guests" className="text-sm text-blush-600 font-semibold mt-3 inline-block">Manage guest list →</Link>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-2xl text-blush-700 mb-3">Budget at a glance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Planned</span><b>{money(planned)}</b></div>
            <div className="flex justify-between"><span className="text-gray-500">Actual cost</span><b>{money(actual)}</b></div>
            <div className="flex justify-between"><span className="text-gray-500">Paid so far</span><b className="text-sage-600">{money(paid)}</b></div>
            <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Outstanding</span><b className="text-blush-600">{money(Math.max(0, actual - paid))}</b></div>
          </div>
          <Link to="/budget" className="text-sm text-blush-600 font-semibold mt-3 inline-block">Open budget →</Link>
        </Card>
      </div>

      <Card className="p-5 mt-4">
        <h3 className="font-display text-2xl text-blush-700 mb-3">To-do progress</h3>
        <div className="h-3 bg-blush-50 rounded-full overflow-hidden">
          <div className="h-full bg-blush-500 transition-all" style={{ width: `${todoProgress}%` }} />
        </div>
        <p className="text-sm text-gray-500 mt-2">{todoDone} of {todos.length} tasks done · <Link to="/todos" className="text-blush-600 font-semibold">view all →</Link></p>
      </Card>
    </div>
  )
}

function Row({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{label}</span><b>{value}</b></div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${pct}%` }} /></div>
    </div>
  )
}
