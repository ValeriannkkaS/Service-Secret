<template>
  <div class="help-options-container1">
    <p class="help">Оставшийся срок жизни пароля: дней - 3, просмотров - 1</p>
    <div class="options-buttons-container1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.help-options-container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  padding: 10px 50px;
  background: #a3b0c6;
  border-radius: 30px 30px 0 0;
  width: 100%;
}
.options-buttons-container1 {
  display: flex;
  gap: 17px;
}
@media (max-width: 1001px) {
  .help-options-container1 {
    flex-direction: column;
    align-items: start;

    justify-content: center;
    gap: 16px;
    border-radius: 0;
    position: static;
    top: 0;
  }
  .help {
    width: 250px;
  }
}
</style>
