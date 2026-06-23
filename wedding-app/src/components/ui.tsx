import { ReactNode } from 'react'

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-blush-700 leading-none">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-blush-100 ${className}`}>{children}</div>
}

export function Stat({ label, value, accent = 'blush' }: { label: string; value: ReactNode; accent?: 'blush' | 'sage' | 'amber' }) {
  const colors: Record<string, string> = {
    blush: 'text-blush-600',
    sage: 'text-sage-600',
    amber: 'text-amber-600',
  }
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${colors[accent]}`}>{value}</div>
    </Card>
  )
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const styles: Record<string, string> = {
    primary: 'bg-blush-600 text-white hover:bg-blush-700',
    ghost: 'bg-blush-50 text-blush-700 hover:bg-blush-100',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Pill({ children, color = 'gray' }: { children: ReactNode; color?: string }) {
  const map: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-600',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    blush: 'bg-blush-100 text-blush-700',
    blue: 'bg-blue-100 text-blue-700',
  }
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${map[color] || map.gray}`}>{children}</span>
}

/** Inline-editable text cell that saves on blur. */
export function EditableCell({
  value,
  onSave,
  placeholder = '—',
  className = '',
  type = 'text',
}: {
  value: string | number | null
  onSave: (v: string) => void
  placeholder?: string
  className?: string
  type?: string
}) {
  return (
    <input
      type={type}
      defaultValue={value ?? ''}
      placeholder={placeholder}
      onBlur={(e) => {
        if (String(e.target.value) !== String(value ?? '')) onSave(e.target.value)
      }}
      className={`w-full bg-transparent px-2 py-1 rounded-lg border border-transparent hover:border-blush-200 focus:border-blush-400 focus:bg-blush-50/40 outline-none text-sm ${className}`}
    />
  )
}
