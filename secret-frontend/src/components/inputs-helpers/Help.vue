<template>
  <p>{{ error }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string
}>()
</script>

<style scoped>
p {
  position: absolute;
  color: red;
}
</style>
