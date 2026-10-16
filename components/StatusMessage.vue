<script setup lang="ts">
// Shows the loading, error, or empty state of a list in one place.
defineProps<{ loading: boolean; error: string | null; empty: boolean; emptyText: string }>()
</script>

<template>
  <p v-if="loading" role="status" class="muted">Loading…</p>
  <p v-else-if="error" class="alert error" role="alert">{{ error }}</p>
  <div v-else-if="empty" class="card empty" role="status">
    <p>{{ emptyText }}</p>
    <slot />
  </div>
</template>
