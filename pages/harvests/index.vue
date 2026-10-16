<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

useHead({ title: 'Harvests' })

const auth = useAuthStore()
const crops = useCropsStore()
const harvests = useHarvestsStore()

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
  { key: 'notes', label: 'Notes' }
])
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
    <template v-if="harvests.filtered.length">
      <p class="total" role="status">Total shown: <strong>{{ formatKg(harvests.totalKg) }}</strong></p>
      <DataTable caption="List of harvests" :columns="columns" :rows="harvests.filtered">
        <template #harvest_date="{ row }">{{ formatDate(row.harvest_date) }}</template>
        <template #quantity_kg="{ row }">{{ formatKg(row.quantity_kg) }}</template>
        <template #notes="{ row }">{{ row.notes || '—' }}</template>
      </DataTable>
    </template>
  </div>
</template>
