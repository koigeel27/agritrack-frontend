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
const cropToDelete = ref<{ id: number; name: string } | null>(null)
const deleteError = ref('')

onMounted(() => crops.fetchAll())

const columns = computed(() => [
  { key: 'name', label: 'Crop' },
  { key: 'category', label: 'Category' },
  { key: 'planted_on', label: 'Planted on' },
  { key: 'field_location', label: 'Field' },
  ...(auth.isAdmin ? [{ key: 'owner_name', label: 'Farmer' }] : []),
  ...(auth.isFarmer ? [{ key: 'actions', label: 'Actions' }] : [])
])

function requestCropDelete(id: number, name: string) {
  actionError.value = ''
  actionOk.value = ''
  deleteError.value = ''
  cropToDelete.value = { id, name }
}

function cancelCropDelete() {
  if (deletingId.value !== null) return
  cropToDelete.value = null
  deleteError.value = ''
}

async function removeCrop() {
  const crop = cropToDelete.value
  if (!crop || deletingId.value !== null) return
  actionError.value = ''
  actionOk.value = ''
  deleteError.value = ''
  deletingId.value = crop.id
  try {
    await crops.remove(crop.id)
    actionOk.value = `"${crop.name}" was deleted.`
    cropToDelete.value = null
  } catch (e: any) {
    const message = readError(e).message
    if ((e?.statusCode ?? e?.response?.status) === 404) {
      await crops.fetchAll()
      cropToDelete.value = null
      actionError.value = message
    } else {
      deleteError.value = message
    }
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
            @click="requestCropDelete(row.id, row.name)"
          >{{ deletingId === row.id ? 'Deleting…' : 'Delete' }}</button>
        </div>
      </template>
    </DataTable>
    <DeleteConfirmDialog
      :open="cropToDelete !== null"
      :title="`Delete ${cropToDelete?.name || 'crop'}?`"
      description="This permanently removes the crop record. Crops with harvest records cannot be deleted."
      :pending="deletingId !== null"
      :error="deleteError"
      @confirm="removeCrop"
      @cancel="cancelCropDelete"
    />
  </div>
</template>