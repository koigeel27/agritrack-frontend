<script setup lang="ts">
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

useHead({ title: 'Log harvest' })
definePageMeta({ roles: ['farmer'] })

const crops = useCropsStore()
const harvests = useHarvestsStore()
const { readError } = useApi()

onMounted(() => { if (!crops.items.length) crops.fetchAll() })

const form = reactive({ crop_id: '', harvest_date: todayISO(), quantity_kg: '', notes: '' })
const errors = reactive<Record<string, string>>({ crop_id: '', harvest_date: '', quantity_kg: '' })
const banner = reactive({ ok: '', fail: '' })
const saving = ref(false)
const cropOptions = computed(() => crops.items.map((c) => ({ value: c.id, label: c.name })))

function validate() {
  const crop = crops.items.find((c) => String(c.id) === form.crop_id)
  errors.crop_id = crop ? '' : 'Choose a crop.'
  if (!form.harvest_date) errors.harvest_date = 'Enter the harvest date.'
  else if (form.harvest_date > todayISO()) errors.harvest_date = 'Harvest date cannot be in the future.'
  else if (crop && form.harvest_date < crop.planted_on) errors.harvest_date = 'Harvest date cannot be before the planting date.'
  else errors.harvest_date = ''
  errors.quantity_kg = Number(form.quantity_kg) > 0 ? '' : 'Quantity must be greater than 0 kg.'
  return !errors.crop_id && !errors.harvest_date && !errors.quantity_kg
}

async function submit() {
  banner.ok = ''
  banner.fail = ''
  if (!validate()) return
  saving.value = true
  try {
    const h = await harvests.add({
      crop_id: Number(form.crop_id),
      harvest_date: form.harvest_date,
      quantity_kg: Number(form.quantity_kg),
      notes: form.notes.trim()
    })
    banner.ok = `Logged ${formatKg(h.quantity_kg)} of ${h.crop_name}.`
    Object.assign(form, { quantity_kg: '', notes: '' })
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
    <h1>Log harvest</h1>
    <p v-if="!crops.loading && !crops.items.length" class="alert info">
      You need a crop first. <NuxtLink to="/crops/new">Add a crop</NuxtLink>
    </p>
    <form v-else class="card" novalidate @submit.prevent="submit">
      <p v-if="banner.ok" class="alert success" role="status">{{ banner.ok }} <NuxtLink to="/harvests">View harvests</NuxtLink></p>
      <p v-if="banner.fail" class="alert error" role="alert">{{ banner.fail }}</p>
      <SelectField id="crop_id" v-model="form.crop_id" label="Crop" required :options="cropOptions" placeholder="Choose a crop" :error="errors.crop_id" />
      <FormField id="harvest_date" v-model="form.harvest_date" label="Harvest date" type="date" required :max="todayISO()" :error="errors.harvest_date" />
      <FormField id="quantity_kg" v-model="form.quantity_kg" label="Quantity (kg)" type="number" step="0.1" required :error="errors.quantity_kg" />
      <FormField id="notes" v-model="form.notes" label="Notes" hint="For example: second picking" />
      <div class="actions">
        <button class="btn" type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save harvest' }}</button>
        <NuxtLink class="btn secondary" to="/harvests">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>
