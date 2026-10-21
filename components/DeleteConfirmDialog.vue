<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  pending?: boolean
  error?: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const dialog = ref<HTMLDialogElement | null>(null)

watch(
  () => props.open,
  async (open) => {
    await nextTick()
    const element = dialog.value
    if (!element) return

    if (open && !element.open) element.showModal()
    else if (!open && element.open) element.close()
  },
  { immediate: true }
)

function handleCancel(event: Event) {
  if (props.pending) {
    event.preventDefault()
    return
  }
  emit('cancel')
}
</script>

<template>
  <dialog
    ref="dialog"
    class="confirm-dialog"
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
    @cancel="handleCancel"
  >
    <div class="confirm-dialog__content">
      <span class="confirm-dialog__icon" aria-hidden="true">!</span>
      <h2 id="delete-dialog-title">{{ title }}</h2>
      <p id="delete-dialog-description">{{ description }}</p>
      <p v-if="error" class="alert error confirm-dialog__error" role="alert">{{ error }}</p>
      <div class="confirm-dialog__actions">
        <button type="button" class="btn secondary" :disabled="pending" @click="emit('cancel')">
          Cancel
        </button>
        <button type="button" class="btn danger" :disabled="pending" @click="emit('confirm')">
          {{ pending ? 'Deleting...' : (confirmLabel || 'Delete') }}
        </button>
      </div>
    </div>
  </dialog>
</template>
