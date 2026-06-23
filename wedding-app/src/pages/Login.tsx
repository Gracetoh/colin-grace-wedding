import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Heart } from 'lucide-react'

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) setMsg(error.message)
      else setMsg('Account created! If email confirmation is on, check your inbox, then sign in.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMsg(error.message)
    }
    setBusy(false)
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gradient-to-br from-blush-50 via-white to-sage-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-blush-700">
            <Heart className="w-7 h-7 fill-blush-400 text-blush-400" />
            <span className="font-display text-4xl">Colin &amp; Grace</span>
          </div>
          <p className="text-gray-500 mt-1">Wedding Planner · 12 Sept 2026</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-md border border-blush-100 p-6 space-y-3">
          <div className="flex gap-2 p-1 bg-blush-50 rounded-xl mb-2">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                  mode === m ? 'bg-white shadow text-blush-700' : 'text-gray-500'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {mode === 'signup' && (
            <input
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-blush-200 focus:border-blush-400 outline-none"
            />
          )}
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-blush-200 focus:border-blush-400 outline-none"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-blush-200 focus:border-blush-400 outline-none"
          />

          {msg && <p className="text-sm text-blush-600 bg-blush-50 rounded-lg px-3 py-2">{msg}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 rounded-xl bg-blush-600 text-white font-semibold hover:bg-blush-700 disabled:opacity-50"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-xs text-gray-400 text-center pt-1">
            The <b>first</b> account created becomes the couple (full access). Everyone after
            is added as bridal party and can be upgraded later.
          </p>
        </form>
      </div>
    </div>
  )
}
