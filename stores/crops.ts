import { defineStore } from 'pinia'

export interface Crop {
  id: number
  user_id: number
  name: string
  category: string
  planted_on: string
  field_location: string
  owner_name?: string
}
export type NewCrop = Pick<Crop, 'name' | 'category' | 'planted_on' | 'field_location'>

export const useCropsStore = defineStore('crops', {
  state: () => ({
    items: [] as Crop[],
    loading: false,
    error: null as string | null
  }),
  getters: {
    total: (s) => s.items.length
  },
  actions: {
    async fetchAll() {
      const { request } = useApi()
      this.loading = true
      this.error = null
      try {
        const res = await request<{ data: Crop[] }>('/crops')
        this.items = res.data
      } catch {
        this.error = 'Could not load crops. Please try again.'
      } finally {
        this.loading = false
      }
    },
    async add(payload: NewCrop) {
      const { request } = useApi()
      const res = await request<{ data: Crop }>('/crops', { method: 'POST', body: payload })
      this.items.push(res.data)
      return res.data
    }
  }
})
