<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Sign in' })
definePageMeta({ layout: 'default' })

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : 'Enter a valid email address.'
  errors.password = password.value.length >= 8 ? '' : 'Password must be at least 8 characters.'
  return !errors.email && !errors.password
}

async function submit() {
  if (!validate()) return
  if (await auth.login(email.value, password.value)) await navigateTo('/')
}
</script>

<template>
  <div class="narrow">
    <h1>Sign in</h1>
    <p class="muted">Log your crops and harvests in one place.</p>
    <form class="card" novalidate @submit.prevent="submit">
      <p v-if="auth.error" class="alert error" role="alert">{{ auth.error }}</p>
      <FormField id="email" v-model="email" label="Email" type="email" required :error="errors.email" />
      <FormField id="password" v-model="password" label="Password" type="password" required :error="errors.password" />
      <button class="btn" type="submit" :disabled="auth.loading">{{ auth.loading ? 'Signing in…' : 'Sign in' }}</button>
      <p class="muted"><small>Demo accounts (mock): farmer@agritrack.test / Farmer123! &middot; admin@agritrack.test / Admin123!</small></p>
    </form>
  </div>
</template>
