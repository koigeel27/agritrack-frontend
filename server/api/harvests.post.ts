import { crops, harvests, nextId } from '../utils/mockdb'
import { fail, requireRole, requireUser } from '../utils/http'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  requireRole(user, 'farmer')
  const b = await readBody<any>(event)

  const details: Record<string, string> = {}
  const crop = crops.find((c) => c.id === Number(b?.crop_id) && c.user_id === user.id)
  if (!crop) details.crop_id = 'Choose one of your crops.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b?.harvest_date || '')) details.harvest_date = 'Enter the harvest date.'
  else if (b.harvest_date > new Date().toISOString().slice(0, 10)) details.harvest_date = 'Harvest date cannot be in the future.'
  else if (crop && b.harvest_date < crop.planted_on) details.harvest_date = 'Harvest date cannot be before the planting date.'
  if (!(Number(b?.quantity_kg) > 0)) details.quantity_kg = 'Quantity must be greater than 0 kg.'
  if (Object.keys(details).length) throw fail(422, 'VALIDATION_ERROR', 'Validation failed.', details)

  const harvest = {
    id: nextId(harvests),
    crop_id: crop!.id,
    harvest_date: b.harvest_date,
    quantity_kg: Number(b.quantity_kg),
    notes: String(b.notes || '').trim()
  }
  harvests.push(harvest)
  setResponseStatus(event, 201)
  return { success: true, data: { ...harvest, crop_name: crop!.name, owner_name: user.full_name } }
})
