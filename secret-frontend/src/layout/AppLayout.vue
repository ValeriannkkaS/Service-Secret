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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #d6cccc;
}
.form-secret-phrase-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 70vh;
  background: #ebebeb;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
</style>
