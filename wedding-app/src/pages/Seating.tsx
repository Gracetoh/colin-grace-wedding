import { useMemo, useState } from 'react'
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors,
  useDraggable, useDroppable, closestCenter, DragStartEvent, DragEndEvent,
} from '@dnd-kit/core'
import { useTable } from '../lib/useTable'
import type { Guest, Table } from '../lib/types'
import { PageHeader, Card, Btn } from '../components/ui'
import { Trash2, Users, GripVertical, Info } from 'lucide-react'

interface TableLayout {
  id: string
  label: string
  type: 'round' | 'long'
  capacity: number
  x: number
  y: number
}

const TABLE_LAYOUTS: TableLayout[] = [
  // Left side round tables (1-10)
  { id: '1', label: '1', type: 'round', capacity: 10, x: 80, y: 280 },
  { id: '2', label: '2', type: 'round', capacity: 10, x: 80, y: 380 },
  { id: '3', label: '3', type: 'round', capacity: 10, x: 80, y: 480 },
  { id: '6', label: '6', type: 'round', capacity: 10, x: 180, y: 280 },
  { id: '5', label: '5', type: 'round', capacity: 10, x: 180, y: 380 },
  { id: '4', label: '4', type: 'round', capacity: 10, x: 180, y: 480 },
  { id: '7', label: '7', type: 'round', capacity: 10, x: 280, y: 280 },
  { id: '8', label: '8', type: 'round', capacity: 10, x: 280, y: 380 },
  { id: '9', label: '9', type: 'round', capacity: 10, x: 280, y: 480 },
  { id: '10', label: '10', type: 'round', capacity: 10, x: 180, y: 530 },

  // Center long tables (11, 12)
  { id: '11', label: '11', type: 'long', capacity: 20, x: 380, y: 300 },
  { id: '12', label: '12', type: 'long', capacity: 20, x: 500, y: 300 },

  // Right side round tables (13-23, VIP)
  { id: 'vip', label: 'VIP Bride', type: 'round', capacity: 10, x: 650, y: 280 },
  { id: '13', label: '13', type: 'round', capacity: 10, x: 750, y: 280 },
  { id: '14', label: '14', type: 'round', capacity: 10, x: 750, y: 380 },
  { id: '15', label: '15', type: 'round', capacity: 10, x: 750, y: 480 },
  { id: '16', label: '16', type: 'round', capacity: 10, x: 850, y: 380 },
  { id: '17', label: '17', type: 'round', capacity: 10, x: 850, y: 480 },
  { id: '18', label: '18', type: 'round', capacity: 10, x: 950, y: 380 },
  { id: '19', label: '19', type: 'round', capacity: 10, x: 950, y: 480 },
  { id: '20', label: '20', type: 'round', capacity: 10, x: 750, y: 580 },
  { id: '21', label: '21', type: 'round', capacity: 10, x: 850, y: 580 },
  { id: '22', label: '22', type: 'round', capacity: 10, x: 950, y: 580 },
  { id: '23', label: '23', type: 'round', capacity: 10, x: 850, y: 280 },
]

export default function Seating() {
  const { rows: guests, update } = useTable<Guest>('guests')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [onlyRsvp, setOnlyRsvp] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } })
  )

  const eligible = useMemo(
    () => guests.filter((g) => (onlyRsvp ? g.rsvp_banquet === 'yes' : g.rsvp_banquet !== 'no')),
    [guests, onlyRsvp]
  )

  const pool = eligible.filter((g) => !g.table_id)
  const byTable = (tableId: string) => eligible.filter((g) => g.table_id === tableId)
  const activeGuest = guests.find((g) => g.id === activeId)
  const totalSeated = eligible.filter((g) => g.table_id).length

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const guestId = String(e.active.id)
    const over = e.over?.id ? String(e.over.id) : null
    if (!over) return
    if (over === 'pool') update(guestId, { table_id: null })
    else update(guestId, { table_id: over })
  }

  const vipAndFamily = TABLE_LAYOUTS.filter((t) => t.label === 'VIP Bride' || t.label === '13')
  const regularTables = TABLE_LAYOUTS.filter((t) => !vipAndFamily.some((v) => v.id === t.id))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <PageHeader
        title="Seating Plan"
        subtitle={`${totalSeated} seated · ${pool.length} unseated · drag guests into tables`}
      />

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Left sidebar — guest pool */}
        <div className="lg:col-span-1">
          <Card className="p-3 sticky top-20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg text-blush-700">Unseated</h3>
              <label className="text-xs flex items-center gap-1 text-gray-500">
                <input type="checkbox" checked={onlyRsvp} onChange={(e) => setOnlyRsvp(e.target.checked)} />
                RSVP only
              </label>
            </div>
            <PoolDroppable>
              <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
                {pool.map((g) => <GuestChip key={g.id} guest={g} />)}
                {pool.length === 0 && <p className="text-sm text-gray-400 text-center py-6">✓ All seated!</p>}
              </div>
            </PoolDroppable>
          </Card>
        </div>

        {/* Center — floor plan */}
        <div className="lg:col-span-3">
          <Card className="p-4">
            <div className="relative w-full bg-gradient-to-b from-blush-50 to-white rounded-xl border border-blush-200 overflow-x-auto">
              {/* Stage area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-blush-200/30 rounded-b-2xl flex items-center justify-center text-sm font-semibold text-blush-500">
                🎤 Stage
              </div>

              {/* SVG canvas for tables */}
              <svg viewBox="0 0 1050 700" className="w-full min-h-[500px] bg-white">
                {/* Aisle centerline */}
                <line x1="500" y1="0" x2="500" y2="700" stroke="#ddd" strokeDasharray="5" strokeWidth="2" />

                {/* Tables */}
                {TABLE_LAYOUTS.map((layout) => (
                  <g key={layout.id}>
                    {layout.type === 'round' ? (
                      <RoundTableSvg layout={layout} guests={byTable(layout.id)} />
                    ) : (
                      <LongTableSvg layout={layout} guests={byTable(layout.id)} />
                    )}
                  </g>
                ))}
              </svg>

              {/* Interactive dropzones overlaid */}
              <div className="absolute inset-0 pointer-events-none">
                {TABLE_LAYOUTS.map((layout) => (
                  <TableDropzone key={layout.id} layout={layout} guests={byTable(layout.id)} />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blush-200 border border-blush-400" />
                <span>Round tables (10 seats)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-sage-200 border border-sage-400" />
                <span>Long tables (20 seats)</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blush-500" />
                <span>VIP & Table 13 = family</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right sidebar — table info */}
        <div className="lg:col-span-1 space-y-2">
          <Card className="p-3 bg-blush-50">
            <h4 className="font-semibold text-sm text-blush-700 mb-2">VIP & Family Tables</h4>
            {vipAndFamily.map((t) => {
              const guests = byTable(t.id)
              return (
                <div key={t.id} className="text-xs mb-2 pb-2 border-b last:border-0">
                  <div className="font-semibold text-blush-600">{t.label}</div>
                  <div className="text-gray-500">{guests.length}/{t.capacity}</div>
                </div>
              )
            })}
          </Card>

          <Card className="p-3">
            <h4 className="font-semibold text-sm text-blush-700 mb-2">Table Status</h4>
            {regularTables.map((t) => {
              const guests = byTable(t.id)
              const isFull = guests.length >= t.capacity
              return (
                <div key={t.id} className="text-xs mb-1">
                  <div className="flex justify-between">
                    <span className={`font-medium ${isFull ? 'text-gray-400' : 'text-gray-700'}`}>{t.label}</span>
                    <span className={isFull ? 'text-red-500' : 'text-gray-500'}>{guests.length}/{t.capacity}</span>
                  </div>
                </div>
              )
            })}
          </Card>
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
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs cursor-grab active:cursor-grabbing select-none whitespace-nowrap
        ${overlay ? 'bg-blush-600 text-white border-blush-600 shadow-lg' : 'bg-white border-blush-100 hover:border-blush-300'}
        ${isDragging ? 'opacity-30' : ''}`}
    >
      <GripVertical className={`w-3 h-3 flex-shrink-0 ${overlay ? 'text-white/70' : 'text-blush-300'}`} />
      <span className="truncate text-[11px]">{guest.full_name}</span>
    </div>
  )
}

function RoundTableSvg({ layout, guests }: { layout: TableLayout; guests: Guest[] }) {
  const isVip = layout.label === 'VIP Bride' || layout.label === '13'
  const isFull = guests.length >= layout.capacity
  const fillColor = isVip ? '#fce7ec' : isFull ? '#fecaca' : '#dbeafe'
  const strokeColor = isVip ? '#df4d77' : isFull ? '#ef4444' : '#3b82f6'

  return (
    <>
      <circle cx={layout.x} cy={layout.y} r="35" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
      <text x={layout.x} y={layout.y - 8} textAnchor="middle" className="text-xs font-bold" fill={strokeColor}>
        {layout.label}
      </text>
      <text x={layout.x} y={layout.y + 8} textAnchor="middle" className="text-[10px]" fill={strokeColor}>
        {guests.length}/{layout.capacity}
      </text>
    </>
  )
}

function LongTableSvg({ layout, guests }: { layout: TableLayout; guests: Guest[] }) {
  const isFull = guests.length >= layout.capacity
  const fillColor = isFull ? '#fecaca' : '#d1d5db'
  const strokeColor = isFull ? '#ef4444' : '#6b7280'

  return (
    <>
      <rect x={layout.x - 40} y={layout.y - 20} width="80" height="40" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
      <text x={layout.x} y={layout.y - 3} textAnchor="middle" className="text-xs font-bold" fill={strokeColor}>
        {layout.label}
      </text>
      <text x={layout.x} y={layout.y + 10} textAnchor="middle" className="text-[10px]" fill={strokeColor}>
        {guests.length}/{layout.capacity}
      </text>
    </>
  )
}

function TableDropzone({ layout, guests }: { layout: TableLayout; guests: Guest[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: layout.id })
  const isFull = guests.length >= layout.capacity
  const isRound = layout.type === 'round'
  const size = isRound ? 70 : 80

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: `calc(${(layout.x / 1050) * 100}% - ${size / 2}px)`,
        top: `calc(${(layout.y / 700) * 100}% - ${size / 2}px)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`pointer-events-auto rounded-full border-2 transition-all ${
        isOver ? 'border-blush-500 bg-blush-200/20 ring-2 ring-blush-400' : 'border-transparent'
      } ${isFull ? 'opacity-50' : ''}`}
    />
  )
}

function PoolDroppable({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'pool' })
  return (
    <div ref={setNodeRef} className={`transition ${isOver ? 'ring-2 ring-blush-400 bg-blush-50' : ''}`}>
      {children}
    </div>
  )
}
