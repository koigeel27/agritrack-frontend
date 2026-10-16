import { crops, users } from '../utils/mockdb'
import { requireUser } from '../utils/http'

// Farmer: own crops only. Admin: every farmer's crops.
export default defineEventHandler((event) => {
  const user = requireUser(event)
  const rows = (user.role === 'admin' ? crops : crops.filter((c) => c.user_id === user.id)).map((c) => ({
    ...c,
    owner_name: users.find((u) => u.id === c.user_id)?.full_name ?? ''
  }))
  return { success: true, data: rows, meta: { total: rows.length } }
})
