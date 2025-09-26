<script setup lang="ts"></script>

<!--// todo https://help.areal.company/services/development_web/notes/frontend-develop.html изучи-->
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
  padding: 50px 50px 35px;
  width: 1000px;
  height: 285px;
  background: #ebebeb;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
@media (max-width: 1001px) {
  .form-secret-phrase-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 0;
    min-width: 350px;
  }
}
</style>
