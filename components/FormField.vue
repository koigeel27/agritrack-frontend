<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  type?: string
  error?: string
  hint?: string
  required?: boolean
  max?: string
  step?: string
}>()
defineEmits<{ 'update:modelValue': [value: string] }>()
const describedBy = computed(() => [props.hint ? `${props.id}-hint` : '', props.error ? `${props.id}-error` : ''].filter(Boolean).join(' ') || undefined)
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}<span v-if="required" aria-hidden="true"> *</span><span v-else class="muted"> (optional)</span></label>
    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      :required="required"
      :max="max"
      :step="step"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <span v-if="hint" :id="`${id}-hint`" class="muted hint">{{ hint }}</span>
    <span v-if="error" :id="`${id}-error`" class="error" role="alert">{{ error }}</span>
  </div>
</template>
