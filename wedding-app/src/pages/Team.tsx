import { useTable } from '../lib/useTable'
import type { Profile } from '../lib/types'
import { PageHeader, Card, Pill } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { Crown, Users } from 'lucide-react'

export default function Team() {
  const { profile: me } = useAuth()
  const { rows, update } = useTable<Profile>('profiles', 'created_at')

  return (
    <div>
      <PageHeader title="Team & Access" subtitle="Manage who can see and edit what" />

      <Card className="p-4 mb-4 bg-blush-50/40">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex gap-2">
            <Crown className="w-5 h-5 text-blush-500 shrink-0" />
            <div><b>Couple</b> — full access to everything: budget, guest list, seating, to-dos and all day-of tools.</div>
          </div>
          <div className="flex gap-2">
            <Users className="w-5 h-5 text-sage-500 shrink-0" />
            <div><b>Bridal party</b> — day-of tools only: red-packet & check-in tracking, points of contact, run sheet and vendors. <u>Cannot see the budget or planning.</u></div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="divide-y divide-blush-50">
          {rows.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-blush-100 text-blush-700 grid place-items-center font-semibold">
                {(p.full_name || p.email || '?').slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.full_name} {p.id === me?.id && <span className="text-xs text-gray-400">(you)</span>}</div>
                <div className="text-xs text-gray-400 truncate">{p.email}</div>
              </div>
              <Pill color={p.role === 'owner' ? 'blush' : 'green'}>{p.role === 'owner' ? 'Couple' : 'Bridal party'}</Pill>
              <select
                value={p.role}
                onChange={(e) => update(p.id, { role: e.target.value as any })}
                disabled={p.id === me?.id}
                className="text-sm rounded-xl border border-blush-200 px-2 py-1.5 outline-none disabled:opacity-40"
                title={p.id === me?.id ? "You can't change your own role" : 'Change role'}
              >
                <option value="owner">Couple</option>
                <option value="bridal">Bridal party</option>
              </select>
            </div>
          ))}
        </div>
      </Card>
      <p className="text-xs text-gray-400 mt-3">
        New people join by opening the site and creating an account. They start as <b>bridal party</b>;
        promote anyone to <b>Couple</b> here. Access is enforced by the database, not just the screen.
      </p>
    </div>
  )
}
