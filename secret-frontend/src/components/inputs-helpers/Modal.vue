<template>
  <div class="modal" :class="{ active: copied, deleted: deleted }">
    <p><slot></slot></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  copied: string
  deleted: string
}>()
</script>

<style scoped>
.modal {
  font-size: 25px;
  position: absolute;
  top: 0;
  transform: translateY(-200%);
  background-color: rgba(157, 80, 244, 0.84);
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  color: white;
  border: 3px solid rgb(125, 27, 239);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.modal.active {
  opacity: 1;
}
.modal.deleted {
  opacity: 1;
  background-color: rgba(232, 101, 56, 0.83);
  border: 3px solid rgb(243, 73, 24);
}
@media (max-width: 1001px) {
  .modal {
    position: absolute;
    top: 0;
    font-size: 20px;
    transform: translateY(200%);
    width: 90%;
  }
}
</style>
