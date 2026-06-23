export type Role = 'owner' | 'bridal'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: Role
  created_at?: string
}

export interface Table {
  id: string
  label: string
  capacity: number
  sort: number
  pos_x: number
  pos_y: number
}

export interface Guest {
  id: string
  full_name: string | null
  age_group: string | null
  guest_of: string | null
  invitation_group: string | null
  table_id: string | null
  dietary: string | null
  std_sent: boolean
  inv_sent: boolean
  rsvp_rom: 'yes' | 'no' | 'pending'
  rsvp_banquet: 'yes' | 'no' | 'pending'
  attended_rom: boolean
  attended_banquet: boolean
  gift_received: boolean
  gift_amount: number | null
  gift_description: string | null
  sort: number
}

export interface BudgetItem {
  id: string
  category: string | null
  name: string | null
  details: string | null
  planned: number | null
  actual: number | null
  paid: number | null
  due_date: string | null
  vendor: string | null
  contact: string | null
  website: string | null
  notes: string | null
  sort: number
}

export interface Todo {
  id: string
  phase: string | null
  task: string | null
  status: string | null
  priority: string | null
  price: string | null
  notes: string | null
  sort: number
}

export interface Vendor {
  id: string
  category: string | null
  company: string | null
  contact_person: string | null
  mobile: string | null
  arrival_time: string | null
  notes: string | null
  sort: number
}

export interface Poc {
  id: string
  task: string | null
  poc_name: string | null
  poc_phone: string | null
  backup_name: string | null
  time_needed: string | null
  location: string | null
  notes: string | null
  done: boolean
  sort: number
}

export interface RundownItem {
  id: string
  time: string | null
  activity: string | null
  location: string | null
  person: string | null
  status: string | null
  notes: string | null
  sort: number
}
