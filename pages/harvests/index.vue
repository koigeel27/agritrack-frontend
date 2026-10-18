<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

useHead({ title: 'Harvests' })

const auth = useAuthStore()
const crops = useCropsStore()
const harvests = useHarvestsStore()
const { readError } = useApi()
const actionError = ref('')
const actionOk = ref('')
const deletingId = ref<number | null>(null)

onMounted(() => {
  crops.fetchAll()
  harvests.fetchAll()
})

const cropOptions = computed(() => [
  { value: 'all', label: 'All crops' },
  ...crops.items.map((c) => ({ value: String(c.id), label: auth.isAdmin ? `${c.name} (${c.owner_name})` : c.name }))
])
const columns = computed(() => [
  { key: 'harvest_date', label: 'Date' },
  { key: 'crop_name', label: 'Crop' },
  ...(auth.isAdmin ? [{ key: 'owner_name', label: 'Farmer' }] : []),
  { key: 'quantity_kg', label: 'Quantity', align: 'right' as const },
  { key: 'notes', label: 'Notes' },
  ...(auth.isFarmer ? [{ key: 'actions', label: 'Actions' }] : [])
])

async function removeHarvest(id: number, label: string) {
  if (deletingId.value !== null) return // blocks double clicks
  if (!confirm(`Delete the harvest "${label}"?`)) return
  actionError.value = ''
  actionOk.value = ''
  deletingId.value = id
  try {
    await harvests.remove(id)
    actionOk.value = 'Harvest was deleted.'
  } catch (e: any) {
    actionError.value = readError(e).message
    if ((e?.statusCode ?? e?.response?.status) === 404) await harvests.fetchAll() // already gone: resync
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div>
    <div class="toolbar">
      <h1>Harvests</h1>
      <NuxtLink v-if="auth.isFarmer" class="btn" to="/harvests/new">Log harvest</NuxtLink>
    </div>
    <div class="filter">
      <SelectField id="crop-filter" v-model="harvests.cropFilter" label="Filter by crop" :options="cropOptions" />
    </div>
    <StatusMessage
      :loading="harvests.loading"
      :error="harvests.error"
      :empty="!harvests.filtered.length"
      empty-text="No harvests found."
    >
      <NuxtLink v-if="auth.isFarmer" class="btn" to="/harvests/new">Log a harvest</NuxtLink>
    </StatusMessage>
    <p v-if="actionOk" class="alert success" role="status">{{ actionOk }}</p>
    <p v-if="actionError" class="alert error" role="alert">{{ actionError }}</p>
    <template v-if="harvests.filtered.length">
      <p class="total" role="status">Total shown: <strong>{{ formatKg(harvests.totalKg) }}</strong></p>
      <DataTable caption="List of harvests" :columns="columns" :rows="harvests.filtered">
        <template #harvest_date="{ row }">{{ formatDate(row.harvest_date) }}</template>
        <template #quantity_kg="{ row }">{{ formatKg(row.quantity_kg) }}</template>
        <template #notes="{ row }">{{ row.notes || '—' }}</template>
        <template #actions="{ row }">
          <div class="row-actions">
            <NuxtLink
              class="btn secondary"
              :to="`/harvests/${row.id}/edit`"
              :aria-label="`Edit ${row.crop_name} harvest of ${formatDate(row.harvest_date)}`"
            >Edit</NuxtLink>
            <button
              type="button"
              class="btn danger"
              :disabled="deletingId !== null"
              :aria-label="`Delete ${row.crop_name} harvest of ${formatDate(row.harvest_date)}`"
              @click="removeHarvest(row.id, `${row.crop_name}, ${formatDate(row.harvest_date)}`)"
            >{{ deletingId === row.id ? 'Deleting…' : 'Delete' }}</button>
          </div>
        </template>
      </DataTable>
    </template>
  </div>
</template>