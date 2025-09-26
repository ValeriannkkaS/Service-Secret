<script setup lang="ts">
import type { optionForSelect } from '@/constants&interfaces/interfaces'

const model = defineModel()

defineProps<{
  options: optionForSelect[]
}>()
</script>

<template>
  <select v-model="model">
    <option v-for="option in options" :value="option.value" :key="option.id">
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped>
select {
  border-radius: 0.7rem;
  transition: 0.3s all;
}
option {
  background: #dddddd;
}
</style>
