import { useMemo, useState } from 'react'
import { useTable } from '../lib/useTable'
import type { BudgetItem } from '../lib/types'
import { PageHeader, Card, Btn, Stat, EditableCell } from '../components/ui'
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

const money = (n: number) => '$' + n.toLocaleString('en-SG', { maximumFractionDigits: 2 })

export default function Budget() {
  const { rows, update, insert, remove } = useTable<BudgetItem>('budget_items')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const categories = useMemo(() => {
    const map = new Map<string, BudgetItem[]>()
    rows.forEach((r) => {
      const c = r.category || 'Uncategorised'
      if (!map.has(c)) map.set(c, [])
      map.get(c)!.push(r)
    })
    return Array.from(map.entries())
  }, [rows])

  const sum = (items: BudgetItem[], k: keyof BudgetItem) => items.reduce((s, i) => s + Number(i[k] || 0), 0)
  const totalPlanned = sum(rows, 'planned')
  const totalActual = sum(rows, 'actual')
  const totalPaid = sum(rows, 'paid')
  const outstanding = Math.max(0, totalActual - totalPaid)

  const addItem = (category: string) =>
    insert({ category, name: 'New item', planned: 0, sort: rows.length } as Partial<BudgetItem>)

  return (
    <div>
      <PageHeader title="Budget" subtitle="Only you and your fiancé can see this page" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="Planned" value={money(totalPlanned)} />
        <Stat label="Actual" value={money(totalActual)} accent="blush" />
        <Stat label="Paid" value={money(totalPaid)} accent="sage" />
        <Stat label="Outstanding" value={money(outstanding)} accent="amber" />
      </div>

      <div className="space-y-3">
        {categories.map(([cat, items]) => {
          const isCollapsed = collapsed[cat]
          return (
            <Card key={cat} className="overflow-hidden">
              <button
                onClick={() => setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))}
                className="w-full flex items-center justify-between px-4 py-3 bg-blush-50/60 hover:bg-blush-50"
              >
                <span className="flex items-center gap-2 font-display text-xl text-blush-700">
                  {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {cat}
                </span>
                <span className="text-sm text-gray-500">
                  Planned <b className="text-gray-700">{money(sum(items, 'planned'))}</b> · Paid <b className="text-sage-600">{money(sum(items, 'paid'))}</b>
                </span>
              </button>

              {!isCollapsed && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-blush-50">
                        <th className="px-3 py-2">Item</th>
                        <th className="px-2 py-2 w-28 text-right">Planned</th>
                        <th className="px-2 py-2 w-28 text-right">Actual</th>
                        <th className="px-2 py-2 w-28 text-right">Paid</th>
                        <th className="px-2 py-2 w-28 text-right">Outstanding</th>
                        <th className="px-2 py-2 w-32">Vendor</th>
                        <th className="px-2 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blush-50">
                      {items.map((it) => {
                        const out = Math.max(0, Number(it.actual || 0) - Number(it.paid || 0))
                        return (
                          <tr key={it.id} className="hover:bg-blush-50/30 align-top">
                            <td className="px-2 py-1">
                              <EditableCell value={it.name} onSave={(v) => update(it.id, { name: v })} className="font-medium" />
                              {it.notes && <div className="text-xs text-gray-400 px-2 whitespace-pre-line">{it.notes}</div>}
                            </td>
                            <td className="px-2 py-1"><EditableCell type="number" value={it.planned} onSave={(v) => update(it.id, { planned: Number(v) || null })} className="text-right" /></td>
                            <td className="px-2 py-1"><EditableCell type="number" value={it.actual} onSave={(v) => update(it.id, { actual: Number(v) || null })} className="text-right" /></td>
                            <td className="px-2 py-1"><EditableCell type="number" value={it.paid} onSave={(v) => update(it.id, { paid: Number(v) || null })} className="text-right" /></td>
                            <td className={`px-2 py-2 text-right font-semibold ${out > 0 ? 'text-blush-600' : 'text-sage-600'}`}>{out > 0 ? money(out) : '✓'}</td>
                            <td className="px-2 py-1"><EditableCell value={it.vendor} onSave={(v) => update(it.id, { vendor: v })} /></td>
                            <td className="px-2 py-1">
                              <button onClick={() => remove(it.id)} className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className="px-3 py-2">
                    <button onClick={() => addItem(cat)} className="text-sm text-blush-600 font-semibold hover:underline"><Plus className="w-4 h-4 inline -mt-0.5" /> Add item</button>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-4">
        <Btn variant="ghost" onClick={() => addItem('New Category')}><Plus className="w-4 h-4 inline -mt-0.5 mr-1" />Add category</Btn>
      </div>
    </div>
  )
}
