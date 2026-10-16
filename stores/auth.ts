import { defineStore } from 'pinia'

export type Role = 'farmer' | 'admin'
export interface User { id: number; full_name: string; email: string; role: Role }

// The sign-in is kept in a cookie so a page refresh does not log the user out.
// MOCK ONLY: at the Final the backend should set an HttpOnly cookie instead.
export const useAuthStore = defineStore('auth', () => {
  const saved = useCookie<{ token: string; user: User } | null>('agritrack_auth', {
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    default: () => null
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const token = computed(() => saved.value?.token ?? null)
  const user = computed(() => saved.value?.user ?? null)
  const isLoggedIn = computed(() => !!token.value)
  const isFarmer = computed(() => user.value?.role === 'farmer')
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(email: string, password: string) {
    const config = useRuntimeConfig()
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ data: { token: string; user: User } }>(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password }
      })
      saved.value = { token: res.data.token, user: res.data.user }
      return true
    } catch (e: any) {
      const err = e?.data?.data?.error ?? e?.data?.error
      error.value = err?.message || 'Unable to sign in. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    saved.value = null
  }

  return { loading, error, token, user, isLoggedIn, isFarmer, isAdmin, login, logout }
})
