<script setup lang="ts">
defineProps<{
  onClick?: () => void
}>()
</script>

<template>
  <button @click="onClick" class="main-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.main-button {
  background: #9d4df3;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 900;
  color: #fff;
  font-size: 1.3rem;
  border-radius: 0.7rem;
  border: none;
  box-shadow: 4px 4px 10px rgba(107, 107, 107, 0.75);
  transition: all ease 0.3s;
  &:hover {
    background: #9647ef;
    box-shadow: 5px 5px 10px rgba(78, 78, 78, 0.75);
  }
  width: 230px;
  height: 40px;
  &.medium {
    width: 300px;
    height: 50px;
  }
  &.large {
    width: 450px;
    height: 50px;
  }
}
</style>
