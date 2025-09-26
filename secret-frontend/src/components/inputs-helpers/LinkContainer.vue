<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  link: string
}>()
const domain = window.location.host

const fullLink = computed(() => `http://${domain}/${props.link}`)
</script>

<template>
  <div class="link-container">
    <span>Ваша ссылка для передачи: </span><a :href="fullLink">{{ fullLink }}</a>
  </div>
</template>

<style scoped>
.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 550;
  width: 65vw;
  min-width: 800px;
  height: 100px;
  position: absolute;
  bottom: 2rem;
  background: #ebebeb;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
</style>
