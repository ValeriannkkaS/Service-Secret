<template>
  <select v-model="model">
    <option v-for="option in options" :value="option.value" :key="option.id">
      {{ option.text[lang] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { optionForSelect } from '@/constants&interfaces/interfaces'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const model = defineModel()
const { locale } = useI18n()
const lang = computed(() => locale.value)

defineProps<{
  options: optionForSelect[]
}>()
</script>

<style scoped>
select {
  border-radius: 0.7rem;
  transition: 0.3s all;
}
option {
  background: #dddddd;
}
</style>
