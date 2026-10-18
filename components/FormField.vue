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

const showPassword = ref(false)

const describedBy = computed(() =>
  [
    props.hint ? `${props.id}-hint` : '',
    props.error ? `${props.id}-error` : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined,
)
</script>

<template>
  <div class="field">
    <label :for="id">
      {{ label }}<span v-if="required" aria-hidden="true"> *</span>
      <span v-else class="muted"> (optional)</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="id"
        :type="type === 'password' && showPassword ? 'text' : (type || 'text')"
        :value="modelValue"
        :required="required"
        :max="max"
        :step="step"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
        :class="{ 'password-input': type === 'password' }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >

      <button
        v-if="type === 'password'"
        type="button"
        class="password-toggle"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        @click="showPassword = !showPassword"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m3 3 18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-4 4.8" />
          <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7c1 0 1.9-.2 2.8-.5" />
        </svg>
      </button>
    </div>

    <span v-if="hint" :id="`${id}-hint`" class="muted hint">{{ hint }}</span>
    <span v-if="error" :id="`${id}-error`" class="error" role="alert">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
}

.input-wrapper input.password-input {
  padding-right: 2.75rem;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}

.password-toggle:hover {
  color: #0f172a;
}

.password-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
