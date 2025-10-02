<template>
  <div class="help">
    <p><slot></slot></p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.help {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 3px 30px;
  border-radius: 30px;
  border: 3px solid;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(200%);
}
.help.error {
  color: #ff0000;
  background: #620303;
}
.help.loading {
  color: #9b311c;
  background: #e4bb0d;
  border-color: #8d7004;
}
@media (max-width: 1001px) {
  .help {
  }
}
</style>
