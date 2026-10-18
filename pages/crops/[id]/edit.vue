<script setup lang="ts">
import { useCropsStore } from '~/stores/crops'

useHead({ title: 'Edit crop' })
definePageMeta({ roles: ['farmer'] })

const route = useRoute()
const crops = useCropsStore()
const { readError } = useApi()

const form = reactive({ name: '', category: '', planted_on: '', field_location: '' })
const errors = reactive<Record<string, string>>({ name: '', category: '', planted_on: '' })
const banner = reactive({ ok: '', fail: '' })
const saving = ref(false)
const loading = ref(true)
const loaded = ref(false)
const categories = ['Vegetable', 'Fruit', 'Grain', 'Root crop'].map((c) => ({ value: c, label: c }))

onMounted(async () => {
  try {
    const c = await crops.getOne(route.params.id as string)
    form.name = c.name
    form.category = c.category
    form.planted_on = (c.planted_on || '').slice(0, 10) // date input needs YYYY-MM-DD
    form.field_location = c.field_location || ''
    loaded.value = true
  } catch (e) {
    banner.fail = readError(e).message
  } finally {
    loading.value = false
  }
})

function validate() {
  errors.name = form.name.trim().length >= 2 ? '' : 'Crop name must be at least 2 characters.'
  errors.category = form.category ? '' : 'Choose a category.'
  if (!form.planted_on) errors.planted_on = 'Enter the planting date.'
  else if (form.planted_on > todayISO()) errors.planted_on = 'Planting date cannot be in the future.'
  else errors.planted_on = ''
  return !errors.name && !errors.category && !errors.planted_on
}

async function submit() {
  banner.ok = ''
  banner.fail = ''
  if (!validate()) return
  saving.value = true
  try {
    await crops.update(route.params.id as string, {
      ...form,
      name: form.name.trim(),
      field_location: form.field_location.trim()
    })
    await navigateTo('/crops')
  } catch (e) {
    const info = readError(e)
    Object.assign(errors, info.fields)
    banner.fail = info.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="narrow">
    <h1>Edit crop</h1>
    <p v-if="loading">Loading…</p>
    <p v-else-if="!loaded" class="alert error" role="alert">
      {{ banner.fail }} <NuxtLink to="/crops">Back to crops</NuxtLink>
    </p>
    <form v-else class="card" novalidate @submit.prevent="submit">
      <p v-if="banner.fail" class="alert error" role="alert">{{ banner.fail }}</p>
      <FormField id="name" v-model="form.name" label="Crop name" required :error="errors.name" />
      <SelectField id="category" v-model="form.category" label="Category" required :options="categories" placeholder="Choose a category" :error="errors.category" />
      <FormField id="planted_on" v-model="form.planted_on" label="Planted on" type="date" required :max="todayISO()" :error="errors.planted_on" />
      <FormField id="field_location" v-model="form.field_location" label="Field location" hint="For example: North plot" />
      <div class="actions">
        <button class="btn" type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save changes' }}</button>
        <NuxtLink class="btn secondary" to="/crops">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>