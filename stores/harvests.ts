import { defineStore } from 'pinia'

export interface Harvest {
  id: number
  crop_id: number
  crop_name: string
  harvest_date: string
  quantity_kg: number
  notes: string
  owner_name?: string
}
export interface NewHarvest { crop_id: number; harvest_date: string; quantity_kg: number; notes: string }

export const useHarvestsStore = defineStore('harvests', {
  state: () => ({
    items: [] as Harvest[],
    loading: false,
    error: null as string | null,
    cropFilter: 'all' as string // 'all' or a crop id as text
  }),
  getters: {
    filtered: (s) => (s.cropFilter === 'all' ? s.items : s.items.filter((h) => String(h.crop_id) === s.cropFilter)),
    totalKg(): number {
      return this.filtered.reduce((sum, h) => sum + h.quantity_kg, 0)
    },
    allTotalKg: (s) => s.items.reduce((sum, h) => sum + h.quantity_kg, 0),
    latestDate: (s) => s.items.map((h) => h.harvest_date).sort().at(-1) ?? null
  },
  actions: {
    async fetchAll() {
      const { request } = useApi()
      this.loading = true
      this.error = null
      try {
        const res = await request<{ data: Harvest[] }>('/harvests')
        this.items = res.data
      } catch {
        this.error = 'Could not load harvests. Please try again.'
      } finally {
        this.loading = false
      }
    },
    async add(payload: NewHarvest) {
      const { request } = useApi()
      const res = await request<{ data: Harvest }>('/harvests', { method: 'POST', body: payload })
      this.items.unshift(res.data)
      this.items.sort((a, b) => b.harvest_date.localeCompare(a.harvest_date) || b.id - a.id)
      return res.data
    }
  }
})
