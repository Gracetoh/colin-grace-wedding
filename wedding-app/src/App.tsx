import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { isConfigured } from './lib/supabase'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GuestList from './pages/GuestList'
import Seating from './pages/Seating'
import Budget from './pages/Budget'
import Todos from './pages/Todos'
import Vendors from './pages/Vendors'
import Poc from './pages/Poc'
import DayOf from './pages/DayOf'
import Rundown from './pages/Rundown'
import Team from './pages/Team'
import NotConfigured from './pages/NotConfigured'

function OwnerOnly({ children }: { children: JSX.Element }) {
  const { isOwner } = useAuth()
  return isOwner ? children : <Navigate to="/dayof" replace />
}

export default function App() {
  const { session, loading, isOwner } = useAuth()

  if (!isConfigured) return <NotConfigured />

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-blush-500 font-display text-2xl">
        Loading…
      </div>
    )

  if (!session) return <Login />

  return (
    <Layout>
      <Routes>
        {/* Owners land on the dashboard; bridal party lands on Day-Of tools. */}
        <Route path="/" element={<Navigate to={isOwner ? '/dashboard' : '/dayof'} replace />} />

        {/* Owner-only planning pages */}
        <Route path="/dashboard" element={<OwnerOnly><Dashboard /></OwnerOnly>} />
        <Route path="/guests" element={<OwnerOnly><GuestList /></OwnerOnly>} />
        <Route path="/seating" element={<OwnerOnly><Seating /></OwnerOnly>} />
        <Route path="/budget" element={<OwnerOnly><Budget /></OwnerOnly>} />
        <Route path="/todos" element={<OwnerOnly><Todos /></OwnerOnly>} />
        <Route path="/team" element={<OwnerOnly><Team /></OwnerOnly>} />

        {/* Shared pages — everyone (owner + bridal party) */}
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/poc" element={<Poc />} />
        <Route path="/dayof" element={<DayOf />} />
        <Route path="/rundown" element={<Rundown />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
