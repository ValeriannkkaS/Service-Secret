<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import Select from '@/components/forms/Select.vue'
import {
  optionsCountOfSymbols,
  optionsCountOfViews,
  optionsExpiresIn,
} from '@/constants&interfaces/optionsForSelect.js'
import { ref, computed } from 'vue'
import SecretServices from '@/services/secret-services.js'
import LinkContainer from '@/components/LinkContainer.vue'
import Help from '@/components/forms/Help.vue'

const link = ref(null)
const error = ref(null)
const secretPhrase = ref('')
const countOfViews = ref(1)
const countOfSymbols = ref(8)
const expiresIn = ref(86400000)

const errorText = computed(() => (secretPhrase.value ? null : error.value))

async function setSecretPhrase() {
  if (!secretPhrase.value) {
    error.value = 'Введите или сгенерируйте секретную фразу'
    return
  }
  try {
    const secretDto = {
      secretPhrase: secretPhrase.value,
      expiresInTimestamp: expiresIn.value,
      availableViews: countOfViews.value,
    }
    const response = await SecretServices.createSecret(secretDto)
    link.value = response.data.link
  } catch (e) {
    error.value = 'Что-то пошло не так, попробуйте позднее'
  }
}

async function generateSecret() {
  try {
    const response = await SecretServices.generateSecretPhrase(countOfSymbols.value)
    secretPhrase.value = response
  } catch (error) {
    error.value = 'ошибка генерирования секретной фразы'
  }
}
</script>

<template>
  <form class="form-container" @submit.prevent="setSecretPhrase">
    <div class="left-form-part">
      <Help v-if="errorText" :error="errorText"></Help>
      <input v-model="secretPhrase" type="text" />
      <div></div>
      <MainButton class="medium" type="submit">Передать!</MainButton>
    </div>
    <div class="divider"></div>
    <div class="right-form-part">
      <div class="right-form-part-options-container">
        <MainButton :on-click="generateSecret" type="button">Сгенерировать</MainButton>
        <Select v-model="countOfSymbols" :options="optionsCountOfSymbols"></Select>
      </div>
      <p>Удалить пароль и сслыку спустя (что наступит раньше):</p>
      <div class="right-form-part-options-container">
        <Select v-model="expiresIn" :options="optionsExpiresIn"></Select>
        <Select v-model="countOfViews" :options="optionsCountOfViews"></Select>
      </div>
    </div>
  </form>
  <LinkContainer v-if="link" :link="link">ссылка</LinkContainer>
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
