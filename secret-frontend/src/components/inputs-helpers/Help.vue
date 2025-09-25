<script setup lang="ts">
const props = defineProps<{
  error: string
}>()
</script>

<template>
  <p>{{ error }}</p>
</template>

<style scoped>
p {
  position: absolute;
  color: red;
}
</style>
