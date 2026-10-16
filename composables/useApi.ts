import { useAuthStore } from '~/stores/auth'

export interface ApiErrorInfo {
  message: string
  fields: Record<string, string>
}

// Single place that talks to the API: adds the Authorization header and signs the
// user out on 401. Stores use this, so switching to the real backend only needs
// a new apiBase (see nuxt.config.ts).
export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  async function request<T>(path: string, options: Record<string, any> = {}): Promise<T> {
    try {
      return await $fetch<T>(`${config.public.apiBase}${path}`, {
        ...options,
        headers: { ...(options.headers || {}), ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }
      })
    } catch (e: any) {
      if ((e?.statusCode === 401 || e?.response?.status === 401) && auth.token) {
        auth.logout()
        await navigateTo('/login')
      }
      throw e
    }
  }

  // Turns a failed request into a message and per-field errors for forms.
  function readError(e: any): ApiErrorInfo {
    // The mock server wraps the body one level deeper (data.data); the real API sends it directly.
    const err = e?.data?.data?.error ?? e?.data?.error
    if (err) return { message: err.message || 'Something went wrong.', fields: err.details || {} }
    return { message: 'Cannot reach the server. Please try again.', fields: {} }
  }

  return { request, readError }
}
