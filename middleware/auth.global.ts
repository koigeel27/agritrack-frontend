import { useAuthStore } from '~/stores/auth'

// Route guard: signed-out users go to /login; pages can limit roles with
// definePageMeta({ roles: ['farmer'] }).
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (to.path === '/login') return auth.isLoggedIn ? navigateTo('/') : undefined
  if (!auth.isLoggedIn) return navigateTo('/login')
  const roles = to.meta.roles as string[] | undefined
  if (roles && auth.user && !roles.includes(auth.user.role)) return navigateTo('/')
})
