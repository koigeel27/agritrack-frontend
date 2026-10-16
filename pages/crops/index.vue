<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'

useHead({ title: 'Crops' })

const auth = useAuthStore()
const crops = useCropsStore()
onMounted(() => crops.fetchAll())

const columns = computed(() => [
  { key: 'name', label: 'Crop' },
  { key: 'category', label: 'Category' },
  { key: 'planted_on', label: 'Planted on' },
  { key: 'field_location', label: 'Field' },
  ...(auth.isAdmin ? [{ key: 'owner_name', label: 'Farmer' }] : [])
])
</script>

<template>
  <div>
    <div class="toolbar">
      <h1>Crops</h1>
      <NuxtLink v-if="auth.isFarmer" class="btn" to="/crops/new">Add crop</NuxtLink>
    </div>
    <StatusMessage :loading="crops.loading" :error="crops.error" :empty="!crops.items.length" empty-text="No crops yet.">
      <NuxtLink v-if="auth.isFarmer" class="btn" to="/crops/new">Add your first crop</NuxtLink>
    </StatusMessage>
    <DataTable v-if="crops.items.length" caption="List of crops" :columns="columns" :rows="crops.items">
      <template #planted_on="{ row }">{{ formatDate(row.planted_on) }}</template>
      <template #field_location="{ row }">{{ row.field_location || '—' }}</template>
    </DataTable>
  </div>
</template>
