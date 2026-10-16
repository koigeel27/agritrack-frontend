import { crops, harvests, users } from '../utils/mockdb'
import { requireUser } from '../utils/http'

// Farmer: harvests of own crops. Admin: all. Optional ?crop_id= filter.
export default defineEventHandler((event) => {
  const user = requireUser(event)
  const cropId = Number(getQuery(event).crop_id) || null
  const rows = harvests
    .map((h) => {
      const crop = crops.find((c) => c.id === h.crop_id)!
      return { ...h, crop_name: crop.name, owner_name: users.find((u) => u.id === crop.user_id)?.full_name ?? '', _owner: crop.user_id }
    })
    .filter((h) => (user.role === 'admin' ? true : h._owner === user.id))
    .filter((h) => (cropId ? h.crop_id === cropId : true))
    .map(({ _owner, ...h }) => h)
    .sort((a, b) => b.harvest_date.localeCompare(a.harvest_date) || b.id - a.id)
  return { success: true, data: rows, meta: { total: rows.length } }
})
