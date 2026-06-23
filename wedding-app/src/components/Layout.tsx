import { ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Users, Armchair, Wallet, ListChecks, Phone,
  ClipboardCheck, CalendarClock, UserCog, Menu, X, LogOut, Heart, Gift,
} from 'lucide-react'

interface NavItem { to: string; label: string; icon: any; ownerOnly?: boolean }

const NAV: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, ownerOnly: true },
  { to: '/guests', label: 'Guest List', icon: Users, ownerOnly: true },
  { to: '/seating', label: 'Seating Plan', icon: Armchair, ownerOnly: true },
  { to: '/budget', label: 'Budget', icon: Wallet, ownerOnly: true },
  { to: '/todos', label: 'To-Do List', icon: ListChecks, ownerOnly: true },
  // shared
  { to: '/dayof', label: 'Day-Of Tracking', icon: Gift },
  { to: '/poc', label: 'Points of Contact', icon: Phone },
  { to: '/rundown', label: 'Run Sheet', icon: CalendarClock },
  { to: '/vendors', label: 'Vendors', icon: ClipboardCheck },
  { to: '/team', label: 'Team & Access', icon: UserCog, ownerOnly: true },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { profile, isOwner, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const items = NAV.filter((n) => !n.ownerOnly || isOwner)

  const SidebarInner = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-blush-100">
        <div className="flex items-center gap-2 text-blush-700">
          <Heart className="w-5 h-5 fill-blush-400 text-blush-400" />
          <span className="font-display text-2xl leading-none">Colin &amp; Grace</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">12 September 2026 · Shangri-La</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {items.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-blush-600 text-white shadow-sm' : 'text-gray-600 hover:bg-blush-50'
              }`
            }
          >
            <n.icon className="w-[18px] h-[18px]" />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-blush-100">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{profile?.full_name}</div>
            <div className="text-xs text-gray-400">{isOwner ? 'Couple · full access' : 'Bridal party'}</div>
          </div>
          <button onClick={signOut} title="Sign out" className="p-2 rounded-lg hover:bg-blush-50 text-gray-500">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">
      {/* desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-blush-100 flex-col fixed inset-y-0">
        {SidebarInner}
      </aside>

      {/* mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-blush-100 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2 text-blush-700">
          <Heart className="w-5 h-5 fill-blush-400 text-blush-400" />
          <span className="font-display text-xl">Colin &amp; Grace</span>
        </div>
        <button onClick={() => setOpen(true)} className="p-2"><Menu className="w-6 h-6 text-blush-700" /></button>
      </header>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 inset-y-0 w-72 bg-white shadow-xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1"><X className="w-5 h-5" /></button>
            {SidebarInner}
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">{children}</div>
      </main>
    </div>
  )
}
