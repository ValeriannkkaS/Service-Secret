<script setup lang="ts"></script>

<template>
  <div class="background">
    <div class="form-secret-phrase-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: #d6cccc;
}
.form-secret-phrase-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-width: 800px;
  min-height: 500px;
  width: 65vw;
  height: 50vh;
  margin: 0 auto;
  transform: translateY(50%);
  background: #ebebeb;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
</style>
