<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import router from '@/router/index.js'

function returnBack() {
  router.push('/')
}
</script>

<template>
  <h1>Секретная фраза:</h1>
  <div class="secret-phrase-container">
    <h2>lkkjfkljsaj</h2>
  </div>
  <MainButton :on-click="returnBack" class="large">Вернуться на главную</MainButton>
</template>

<style scoped>
.secret-phrase-container {
  width: 80%;
  min-width: 700px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  border-radius: 30px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
