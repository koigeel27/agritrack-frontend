<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  options: { value: string | number; label: string }[]
  placeholder?: string
  error?: string
  required?: boolean
}>()
defineEmits<{ 'update:modelValue': [value: string] }>()
const describedBy = computed(() => (props.error ? `${props.id}-error` : undefined))
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}<span v-if="required" aria-hidden="true"> *</span></label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <span v-if="error" :id="`${id}-error`" class="error" role="alert">{{ error }}</span>
  </div>
</template>
