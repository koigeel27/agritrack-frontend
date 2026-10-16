<script setup lang="ts">
defineProps<{
  caption: string
  columns: { key: string; label: string; align?: 'right' }[]
  rows: Record<string, any>[]
}>()
</script>

<template>
  <div class="card table-wrap">
    <table>
      <caption class="sr-only">{{ caption }}</caption>
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key" scope="col" :class="{ right: c.align === 'right' }">{{ c.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td v-for="c in columns" :key="c.key" :class="{ right: c.align === 'right' }">
            <slot :name="c.key" :row="r">{{ r[c.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
