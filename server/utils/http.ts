import type { H3Event } from 'h3'
import { users, type MockUser } from './mockdb'

// Error envelope shared with the backend contract:
// { success: false, error: { code, message, details? } }
export function fail(statusCode: number, code: string, message: string, details?: Record<string, string>) {
  return createError({ statusCode, data: { success: false, error: { code, message, ...(details ? { details } : {}) } } })
}

// Mock auth: the token is "mock-token-<userId>". The real backend uses a signed JWT.
export function requireUser(event: H3Event): MockUser {
  const header = getHeader(event, 'authorization') || ''
  const match = /^Bearer mock-token-(\d+)$/.exec(header)
  const user = match ? users.find((u) => u.id === Number(match[1])) : undefined
  if (!user) throw fail(401, 'UNAUTHORIZED', 'Please sign in to continue.')
  return user
}

export function requireRole(user: MockUser, role: MockUser['role']) {
  if (user.role !== role) throw fail(403, 'FORBIDDEN', 'Your role is not allowed to do this.')
}
