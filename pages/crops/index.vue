<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCropsStore } from '~/stores/crops'

useHead({ title: 'Crops' })

const auth = useAuthStore()
const crops = useCropsStore()
const { readError } = useApi()
const actionError = ref('')
const actionOk = ref('')
const deletingId = ref<number | null>(null)

onMounted(() => crops.fetchAll())

const columns = computed(() => [
  { key: 'name', label: 'Crop' },
  { key: 'category', label: 'Category' },
  { key: 'planted_on', label: 'Planted on' },
  { key: 'field_location', label: 'Field' },
  ...(auth.isAdmin ? [{ key: 'owner_name', label: 'Farmer' }] : []),
  ...(auth.isFarmer ? [{ key: 'actions', label: 'Actions' }] : [])
])

async function removeCrop(id: number, name: string) {
  if (deletingId.value !== null) return // blocks double clicks
  if (!confirm(`Delete "${name}"?`)) return
  actionError.value = ''
  actionOk.value = ''
  deletingId.value = id
  try {
    await crops.remove(id)
    actionOk.value = `"${name}" was deleted.`
  } catch (e: any) {
    actionError.value = readError(e).message // 409 = the crop still has harvests
    if ((e?.statusCode ?? e?.response?.status) === 404) await crops.fetchAll() // already gone: resync
  } finally {
    deletingId.value = null
  }
}
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
    <p v-if="actionOk" class="alert success" role="status">{{ actionOk }}</p>
    <p v-if="actionError" class="alert error" role="alert">{{ actionError }}</p>
    <DataTable v-if="crops.items.length" caption="List of crops" :columns="columns" :rows="crops.items">
      <template #planted_on="{ row }">{{ formatDate(row.planted_on) }}</template>
      <template #field_location="{ row }">{{ row.field_location || '—' }}</template>
      <template #actions="{ row }">
        <div class="row-actions">
          <NuxtLink class="btn secondary" :to="`/crops/${row.id}/edit`" :aria-label="`Edit ${row.name}`">Edit</NuxtLink>
          <button
            type="button"
            class="btn danger"
            :disabled="deletingId !== null"
            :aria-label="`Delete ${row.name}`"
            @click="removeCrop(row.id, row.name)"
          >{{ deletingId === row.id ? 'Deleting…' : 'Delete' }}</button>
        </div>
      </template>
    </DataTable>
  </div>
</template>