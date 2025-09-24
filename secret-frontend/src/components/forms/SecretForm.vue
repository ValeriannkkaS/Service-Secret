<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import Select from '@/components/forms/Select.vue'
import {
  optionsCountOfSymbols,
  optionsCountOfViews,
  optionsExpiresIn,
} from '@/optionsForSelect/optionsForSelect.js'
import { ref } from 'vue'

const countOfViews = ref(1)
const countOfSymbols = ref(8)
const expiresIn = ref(86400000)

function setSecretPhrase() {}

function generateSecret() {}
</script>

<template>
  <form class="form-container">
    <div class="left-form-part">
      <input type="text" />
      <div></div>
      <MainButton class="medium" :on-click="setSecretPhrase">Передать!</MainButton>
    </div>
    <div class="divider"></div>
    <div class="right-form-part">
      <div class="right-form-part-options-container">
        <MainButton :on-click="generateSecret">Сгенерировать</MainButton>
        <Select v-model="countOfSymbols" :options="optionsCountOfSymbols"></Select>
      </div>
      <p>Удалить пароль и сслыку спустя (что наступит раньше):</p>
      <div class="right-form-part-options-container">
        <Select v-model="expiresIn" :options="optionsExpiresIn"></Select>
        <Select v-model="countOfViews" :options="optionsCountOfViews"></Select>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.divider {
  width: 3px;
  border-radius: 1px;
  height: 95%;
  background-color: rgba(173, 173, 173, 0.56);
}
.left-form-part,
.right-form-part {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}
.right-form-part-options-container {
  display: flex;
  gap: 100px;
}
input {
  padding: 3px;
  width: 300px;
  height: 50px;
  font-size: 20px;
  border-radius: 0.7rem;
  border: 1px solid rgba(173, 173, 173, 0.56);
  &:hover {
    border: 1px solid rgba(171, 104, 234, 0.56);
  }
}
</style>
