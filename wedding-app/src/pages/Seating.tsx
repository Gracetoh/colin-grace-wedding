import { useMemo, useState } from 'react'
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors,
  useDraggable, useDroppable, closestCenter, DragStartEvent, DragEndEvent,
} from '@dnd-kit/core'
import { useTable } from '../lib/useTable'
import type { Guest, Table } from '../lib/types'
import { PageHeader, Card, Btn } from '../components/ui'
import { Trash2, Users, GripVertical } from 'lucide-react'

export default function Seating() {
  const { rows: guests, update } = useTable<Guest>('guests')
  const { rows: tables } = useTable<Table>('tables')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [onlyRsvp, setOnlyRsvp] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } })
  )

  // Only RSVP'd banquet guests are eligible for seating
  const eligible = useMemo(
    () => guests.filter((g) => (onlyRsvp ? g.rsvp_banquet === 'yes' : g.rsvp_banquet !== 'no')),
    [guests, onlyRsvp]
  )
  const pool = eligible.filter((g) => !g.table_id)
  const byTable = (id: string) => eligible.filter((g) => g.table_id === id)
  const activeGuest = guests.find((g) => g.id === activeId)

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const guestId = String(e.active.id)
    const over = e.over?.id ? String(e.over.id) : null
    if (!over) return
    if (over === 'pool') update(guestId, { table_id: null })
    else if (over.startsWith('table:')) update(guestId, { table_id: over.slice(6) })
  }

  const totalSeated = eligible.filter((g) => g.table_id).length

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <PageHeader
        title="Seating Plan"
        subtitle={`${totalSeated} seated · ${pool.length} still to place · drag a guest onto a table`}
      />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Guest pool */}
        <div className="lg:w-72 lg:shrink-0">
          <PoolDroppable count={pool.length}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl text-blush-700">Unseated</h3>
              <label className="text-xs flex items-center gap-1 text-gray-500">
                <input type="checkbox" checked={onlyRsvp} onChange={(e) => setOnlyRsvp(e.target.checked)} />
                RSVP only
              </label>
            </div>
            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {pool.map((g) => <GuestChip key={g.id} guest={g} />)}
              {pool.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">🎉 Everyone is seated!</p>}
            </div>
          </PoolDroppable>
        </div>

        {/* Tables grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {tables.map((t) => (
            <TableCard
              key={t.id}
              table={t}
              guests={byTable(t.id)}
            />
          ))}
        </div>
      </div>

      <DragOverlay>{activeGuest ? <GuestChip guest={activeGuest} overlay /> : null}</DragOverlay>
    </DndContext>
  )
}

function GuestChip({ guest, overlay }: { guest: Guest; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: guest.id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-sm cursor-grab active:cursor-grabbing select-none
        ${overlay ? 'bg-blush-600 text-white border-blush-600 shadow-lg' : 'bg-white border-blush-100 hover:border-blush-300'}
        ${isDragging ? 'opacity-30' : ''}`}
    >
      <GripVertical className={`w-3.5 h-3.5 ${overlay ? 'text-white/70' : 'text-blush-300'}`} />
      <span className="font-medium truncate">{guest.full_name}</span>
      {guest.age_group === 'Kid' && <span className="text-[10px]">🧒</span>}
      {guest.dietary && <span className="text-[10px] opacity-60" title={guest.dietary}>🍽️</span>}
    </div>
  )
}

function TableCard({
  table, guests,
}: {
  table: Table; guests: Guest[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `table:${table.id}` })
  const over = guests.length > table.capacity

  return (
    <Card className={`p-3 transition ${isOver ? 'ring-2 ring-blush-400 bg-blush-50/50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg text-blush-700">{table.label}</h3>
        <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${over ? 'bg-red-100 text-red-600' : 'bg-sage-100 text-sage-700'}`}>
          <Users className="w-3 h-3" />
          {guests.length}/{table.capacity}
        </span>
      </div>
      <div ref={setNodeRef} className="min-h-[80px] space-y-1.5 rounded-xl p-1 -m-1">
        {guests.map((g) => <GuestChip key={g.id} guest={g} />)}
        {guests.length === 0 && <p className="text-xs text-gray-300 text-center py-5 border-2 border-dashed border-blush-100 rounded-xl">Drop guests here</p>}
      </div>
    </Card>
  )
}

function PoolDroppable({ children, count }: { children: React.ReactNode; count: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'pool' })
  return (
    <div ref={setNodeRef} className={`bg-white rounded-2xl border p-3 sticky top-4 ${isOver ? 'ring-2 ring-blush-400 border-blush-300' : 'border-blush-100'}`}>
      {children}
    </div>
  )
}
