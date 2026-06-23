import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from './supabase'

/**
 * useTable — loads a whole table and keeps it LIVE.
 * Any insert / update / delete made by ANYONE (you, fiancé, bridal party)
 * is pushed to every open browser through Supabase Realtime, so the screen
 * updates without refreshing. This is what makes collaboration feel instant.
 */
export function useTable<T extends { id: string; sort?: number }>(
  table: string,
  orderBy: string = 'sort'
) {
  const [rows, setRows] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tableRef = useRef(table)

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending: true })
    if (error) setError(error.message)
    else setRows((data as T[]) || [])
    setLoading(false)
  }, [table, orderBy])

  useEffect(() => {
    fetchAll()
    const channel = supabase
      .channel(`realtime:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        setRows((prev) => {
          if (payload.eventType === 'INSERT') {
            const row = payload.new as T
            if (prev.some((r) => r.id === row.id)) return prev
            return sortRows([...prev, row], orderBy)
          }
          if (payload.eventType === 'UPDATE') {
            const row = payload.new as T
            return sortRows(prev.map((r) => (r.id === row.id ? row : r)), orderBy)
          }
          if (payload.eventType === 'DELETE') {
            const old = payload.old as { id: string }
            return prev.filter((r) => r.id !== old.id)
          }
          return prev
        })
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  // --- write helpers (optimistic-friendly) ---------------------------------
  const update = useCallback(
    async (id: string, patch: Partial<T>) => {
      setRows((prev) => sortRows(prev.map((r) => (r.id === id ? { ...r, ...patch } : r)), orderBy))
      const { error } = await supabase.from(tableRef.current).update(patch).eq('id', id)
      if (error) {
        setError(error.message)
        fetchAll()
      }
    },
    [orderBy, fetchAll]
  )

  const insert = useCallback(
    async (row: Partial<T>) => {
      const { data, error } = await supabase.from(tableRef.current).insert(row).select().single()
      if (error) setError(error.message)
      else if (data) setRows((prev) => sortRows([...prev.filter((r) => r.id !== (data as T).id), data as T], orderBy))
      return data as T | undefined
    },
    [orderBy]
  )

  const remove = useCallback(async (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
    const { error } = await supabase.from(tableRef.current).delete().eq('id', id)
    if (error) {
      setError(error.message)
      fetchAll()
    }
  }, [fetchAll])

  return { rows, setRows, loading, error, update, insert, remove, refetch: fetchAll }
}

function sortRows<T extends Record<string, any>>(rows: T[], key: string): T[] {
  return [...rows].sort((a, b) => {
    const av = a[key] ?? 0
    const bv = b[key] ?? 0
    if (typeof av === 'number' && typeof bv === 'number') return av - bv
    return String(av).localeCompare(String(bv))
  })
}
