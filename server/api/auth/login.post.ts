import { users } from '../../utils/mockdb'
import { fail } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const user = users.find((u) => u.email === body?.email && u.password === body?.password)
  if (!user) throw fail(401, 'INVALID_CREDENTIALS', 'Incorrect email or password.')
  const { password, ...safe } = user
  return { success: true, data: { token: `mock-token-${user.id}`, user: safe } }
})
