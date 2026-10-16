import { crops, nextId } from '../utils/mockdb'
import { fail, requireRole, requireUser } from '../utils/http'

const CATEGORIES = ['Vegetable', 'Fruit', 'Grain', 'Root crop']

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  requireRole(user, 'farmer')
  const b = await readBody<any>(event)

  const details: Record<string, string> = {}
  if (!b?.name || String(b.name).trim().length < 2) details.name = 'Crop name must be at least 2 characters.'
  if (!CATEGORIES.includes(b?.category)) details.category = 'Choose a category.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b?.planted_on || '')) details.planted_on = 'Enter the planting date.'
  else if (b.planted_on > new Date().toISOString().slice(0, 10)) details.planted_on = 'Planting date cannot be in the future.'
  if (Object.keys(details).length) throw fail(422, 'VALIDATION_ERROR', 'Validation failed.', details)

  const crop = {
    id: nextId(crops),
    user_id: user.id,
    name: String(b.name).trim(),
    category: b.category,
    planted_on: b.planted_on,
    field_location: String(b.field_location || '').trim()
  }
  crops.push(crop)
  setResponseStatus(event, 201)
  return { success: true, data: { ...crop, owner_name: user.full_name } }
})
