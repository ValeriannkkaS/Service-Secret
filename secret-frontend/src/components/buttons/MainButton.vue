<template>
  <button @click="onClick" class="main-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  onClick?: () => void
}>()
</script>

<style scoped>
.main-button[disabled] {
  cursor: not-allowed;
  background-color: #5a5560 !important;
}
.main-button {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  cursor: pointer;
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
  &.violet {
    background: #9d4df3;
  }
  &.orange {
    background: #c63400;
  }
  &.option-btn {
    padding: 0 16px;
    font-size: 13px;
    border-radius: 6px;
  }
}
.main-button:active {
  transition: 0.05s;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 5px rgba(78, 78, 78, 0.75);
}
</style>
