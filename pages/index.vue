<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'
import { useHarvestsStore } from '~/stores/harvests'

useHead({ title: 'Dashboard' })

const auth = useAuthStore()
const crops = useCropsStore()
const harvests = useHarvestsStore()

onMounted(() => {
  crops.fetchAll()
  harvests.fetchAll()
})

const recent = computed(() => harvests.items.slice(0, 5))
const columns = computed(() => [
  { key: 'harvest_date', label: 'Date' },
  { key: 'crop_name', label: 'Crop' },
  ...(auth.isAdmin ? [{ key: 'owner_name', label: 'Farmer' }] : []),
  { key: 'quantity_kg', label: 'Quantity', align: 'right' as const }
])
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="auth.isAdmin" class="alert info">You are viewing every farmer's records. Admin access is read-only.</p>
    <p v-else class="muted">Welcome, {{ auth.user?.full_name }}.</p>

    <div class="grid cols-auto spaced">
      <StatCard label="Crops" :value="crops.total" />
      <StatCard label="Harvest records" :value="harvests.items.length" />
      <StatCard label="Total harvested" :value="formatKg(harvests.allTotalKg)" />
      <StatCard label="Latest harvest" :value="formatDate(harvests.latestDate)" />
    </div>

    <section aria-labelledby="recent-title">
      <h2 id="recent-title">Recent harvests</h2>
      <StatusMessage
        :loading="harvests.loading"
        :error="harvests.error"
        :empty="!harvests.items.length"
        empty-text="No harvests recorded yet."
      >
        <NuxtLink v-if="auth.isFarmer" class="btn" to="/harvests/new">Log your first harvest</NuxtLink>
      </StatusMessage>
      <DataTable v-if="recent.length" caption="Five most recent harvests" :columns="columns" :rows="recent">
        <template #harvest_date="{ row }">{{ formatDate(row.harvest_date) }}</template>
        <template #quantity_kg="{ row }">{{ formatKg(row.quantity_kg) }}</template>
      </DataTable>
    </section>

    <div v-if="auth.isFarmer" class="actions">
      <NuxtLink class="btn" to="/harvests/new">Log harvest</NuxtLink>
      <NuxtLink class="btn secondary" to="/crops/new">Add crop</NuxtLink>
    </div>
  </div>
</template>
