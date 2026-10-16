// In-memory mock data. Shapes mirror the planned backend API (docs/API_CONTRACT.md):
// snake_case fields and a { success, data, meta } envelope.
export interface MockUser { id: number; full_name: string; email: string; password: string; role: 'farmer' | 'admin' }
export interface MockCrop { id: number; user_id: number; name: string; category: string; planted_on: string; field_location: string }
export interface MockHarvest { id: number; crop_id: number; harvest_date: string; quantity_kg: number; notes: string }

export const users: MockUser[] = [
  { id: 1, full_name: 'Maria Santos', email: 'farmer@agritrack.test', password: 'Farmer123!', role: 'farmer' },
  { id: 2, full_name: 'Pedro Dela Cruz', email: 'farmer2@agritrack.test', password: 'Farmer123!', role: 'farmer' },
  { id: 3, full_name: 'Coop Admin', email: 'admin@agritrack.test', password: 'Admin123!', role: 'admin' }
]

export const crops: MockCrop[] = [
  { id: 1, user_id: 1, name: 'Sweet Corn', category: 'Grain', planted_on: '2026-07-15', field_location: 'North plot' },
  { id: 2, user_id: 1, name: 'Eggplant', category: 'Vegetable', planted_on: '2026-08-01', field_location: 'River side' },
  { id: 3, user_id: 1, name: 'Lakatan Banana', category: 'Fruit', planted_on: '2026-01-10', field_location: 'Hill block' },
  { id: 4, user_id: 2, name: 'Rice (Palay)', category: 'Grain', planted_on: '2026-06-20', field_location: 'Lowland field' }
]

export const harvests: MockHarvest[] = [
  { id: 1, crop_id: 1, harvest_date: '2026-09-28', quantity_kg: 420, notes: 'First picking, good size' },
  { id: 2, crop_id: 2, harvest_date: '2026-10-02', quantity_kg: 85.5, notes: '' },
  { id: 3, crop_id: 3, harvest_date: '2026-10-05', quantity_kg: 310, notes: 'Sold to the coop' },
  { id: 4, crop_id: 1, harvest_date: '2026-10-08', quantity_kg: 260, notes: 'Second picking' },
  { id: 5, crop_id: 4, harvest_date: '2026-10-09', quantity_kg: 1200, notes: '' }
]

export const nextId = (rows: { id: number }[]) => (rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1)
