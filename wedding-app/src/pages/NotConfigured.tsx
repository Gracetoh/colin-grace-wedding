import { Heart } from 'lucide-react'

export default function NotConfigured() {
  return (
    <div className="min-h-screen grid place-items-center px-4 bg-blush-50">
      <div className="max-w-lg bg-white rounded-2xl shadow border border-blush-100 p-8 text-center">
        <Heart className="w-10 h-10 mx-auto fill-blush-400 text-blush-400" />
        <h1 className="font-display text-3xl text-blush-700 mt-3">Almost there!</h1>
        <p className="text-gray-600 mt-3">
          The app isn't connected to your database yet. Create a free Supabase project,
          then add your keys to a <code className="bg-blush-50 px-1 rounded">.env</code> file
          (copy <code className="bg-blush-50 px-1 rounded">.env.example</code>).
        </p>
        <pre className="text-left text-xs bg-gray-900 text-gray-100 rounded-xl p-4 mt-4 overflow-x-auto">
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
        </pre>
        <p className="text-sm text-gray-400 mt-4">See <b>README.md</b> for the full step-by-step guide.</p>
      </div>
    </div>
  )
}
