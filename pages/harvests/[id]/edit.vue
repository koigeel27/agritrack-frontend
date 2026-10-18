<script setup lang="ts">
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

useHead({ title: 'Edit harvest' })
definePageMeta({ roles: ['farmer'] })

const route = useRoute()
const crops = useCropsStore()
const harvests = useHarvestsStore()
const { readError } = useApi()

const cropName = ref('')
const cropId = ref<number | null>(null)
const form = reactive({ harvest_date: '', quantity_kg: '', notes: '' })
const errors = reactive<Record<string, string>>({ harvest_date: '', quantity_kg: '' })
const banner = reactive({ fail: '' })
const saving = ref(false)
const loading = ref(true)
const loaded = ref(false)

onMounted(async () => {
  try {
    if (!crops.items.length) await crops.fetchAll()
    const h = await harvests.getOne(route.params.id as string)
    cropName.value = h.crop_name
    cropId.value = h.crop_id
    form.harvest_date = (h.harvest_date || '').slice(0, 10)
    form.quantity_kg = String(h.quantity_kg)
    form.notes = h.notes || ''
    loaded.value = true
  } catch (e) {
    banner.fail = readError(e).message
  } finally {
    loading.value = false
  }
})

function validate() {
  const crop = crops.items.find((c) => c.id === cropId.value)
  if (!form.harvest_date) errors.harvest_date = 'Enter the harvest date.'
  else if (form.harvest_date > todayISO()) errors.harvest_date = 'Harvest date cannot be in the future.'
  else if (crop && form.harvest_date < crop.planted_on.slice(0, 10)) errors.harvest_date = 'Harvest date cannot be before the planting date.'
  else errors.harvest_date = ''
  errors.quantity_kg = Number(form.quantity_kg) > 0 ? '' : 'Quantity must be greater than 0 kg.'
  return !errors.harvest_date && !errors.quantity_kg
}

async function submit() {
  banner.fail = ''
  if (!validate()) return
  saving.value = true
  try {
    await harvests.update(route.params.id as string, {
      harvest_date: form.harvest_date,
      quantity_kg: Number(form.quantity_kg),
      notes: form.notes.trim()
    })
    await navigateTo('/harvests')
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
    <h1>Edit harvest</h1>
    <p v-if="loading" role="status">Loading…</p>
    <p v-else-if="!loaded" class="alert error" role="alert">
      {{ banner.fail }} <NuxtLink to="/harvests">Back to harvests</NuxtLink>
    </p>
    <form v-else class="card" novalidate @submit.prevent="submit">
      <p v-if="banner.fail" class="alert error" role="alert">{{ banner.fail }}</p>
      <p class="muted">Crop: <strong>{{ cropName }}</strong></p>
      <FormField id="harvest_date" v-model="form.harvest_date" label="Harvest date" type="date" required :max="todayISO()" :error="errors.harvest_date" />
      <FormField id="quantity_kg" v-model="form.quantity_kg" label="Quantity (kg)" type="number" step="0.1" required :error="errors.quantity_kg" />
      <FormField id="notes" v-model="form.notes" label="Notes" hint="For example: second picking" />
      <div class="actions">
        <button class="btn" type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save changes' }}</button>
        <NuxtLink class="btn secondary" to="/harvests">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>