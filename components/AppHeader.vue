<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

const auth = useAuthStore()
const crops = useCropsStore()
const harvests = useHarvestsStore()
const open = ref(false)
const route = useRoute()

watch(() => route.path, () => { open.value = false })

async function logout() {
  auth.logout()
  crops.$reset()
  harvests.$reset()
  await navigateTo('/login')
}
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <NuxtLink to="/" class="brand">🌾 AgriTrack</NuxtLink>
      <template v-if="auth.isLoggedIn">
        <button class="nav-toggle" :aria-expanded="open" aria-controls="main-nav" @click="open = !open">Menu</button>
        <nav id="main-nav" class="nav" :class="{ open }" aria-label="Main navigation">
          <NuxtLink to="/">Dashboard</NuxtLink>
          <NuxtLink to="/crops">Crops</NuxtLink>
          <NuxtLink to="/harvests">Harvests</NuxtLink>
          <button type="button" class="nav-logout" @click="logout">
            Sign out ({{ auth.user?.full_name }}, {{ auth.user?.role }})
          </button>
        </nav>
      </template>
    </div>
  </header>
</template>
