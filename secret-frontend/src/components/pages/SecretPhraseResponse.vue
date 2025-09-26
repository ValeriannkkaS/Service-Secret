<template>
  <div class="help-options-container">
    <p class="help">Оставшийся срок жизни пароля: дней - 3, просмотров - 1</p>
    <div class="options-buttons-container">
      <MainButton class="orange option-btn">Удалить</MainButton>
      <MainButton class="violet option-btn">Передать еще</MainButton>
    </div>
  </div>
  <div class="response-container">
    <p>Ваш пароль:</p>
    <div class="secret-phrase-container">
      <div v-if="loading" class="loading">
        <p>Загрузка...</p>
      </div>
      <div v-if="error" class="error">
        <p>
          Срок действия пароля истек, либо ссылка недействительна или исчерпала все свои просмотры
        </p>
      </div>
      <div v-if="secretPhrase">
        <p>{{ secretPhrase }}</p>
      </div>
    </div>
    <MainButton :on-click="returnBack" class="show-copy-btn orange">Показать пароль</MainButton>
    <!--todo динамическая смена цвета и текста внутри кнопки + функционал копирования пароля-->
  </div>
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import router from '@/router/index.ts'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import SecretServices from '@/services/secret-services.ts'

const route = useRoute()
const loading = ref(false)
const error = ref(null)
const secretPhrase = ref(null)

watch(() => route.params.link, getSecretPhrase, { immediate: true })

// todo стрелочные функции
async function getSecretPhrase() {
  error.value = secretPhrase.value = null
  loading.value = true

  try {
    const response = await SecretServices.getSecretPhrase(route.params.link)
    console.log(response)
    secretPhrase.value = response
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
}

function returnBack() {
  router.push('/')
}
</script>

<style scoped>
.help-options-container {
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
.response-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 17px;
  width: 100%;
}
.options-buttons-container {
  display: flex;
  gap: 17px;
}
.secret-phrase-container p {
  white-space: nowrap;
}
.secret-phrase-container {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  justify-content: start;
  padding: 0 16px;
  background: rgba(215, 191, 243, 0.7);
  border: solid 2px #9d4df3;
  border-radius: 0.7rem;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.error {
  color: red;
}
.option-btn {
  padding: 0 16px;
  font-size: 13px;
  border-radius: 6px;
}
.show-copy-btn {
  width: 100%;
  height: 60px;
}
@media (max-width: 1001px) {
  .help-options-container {
    flex-direction: column;
    align-items: start;

    justify-content: center;
    gap: 16px;
    border-radius: 0;
    position: static;
    top: 0;
  }
  .secret-phrase-container {
    overflow: auto;
  }
  .response-container {
    padding: 30px;
  }
  .help {
    width: 250px;
  }
}
</style>
