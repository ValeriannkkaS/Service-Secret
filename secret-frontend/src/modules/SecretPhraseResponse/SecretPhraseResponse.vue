<template>
  <HelpOptionsContainer>
    <MainButton class="orange option-btn">Удалить</MainButton>
    <MainButton :on-click="returnBack" class="violet option-btn">Передать еще</MainButton>
  </HelpOptionsContainer>
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
    <MainButton class="show-copy-btn orange">Показать пароль</MainButton>
    <!--todo динамическая смена цвета и текста внутри кнопки + функционал копирования пароля-->
  </div>
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import SecretServices from '@/services/secret-services.ts'
import HelpOptionsContainer from '@/modules/helpOptionsContainer/HelpOptionsContainer.vue'

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

const returnBack = () => router.push('/')
</script>

<style scoped>
.response-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 17px;
  width: 100%;
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
.show-copy-btn {
  width: 100%;
  height: 60px;
}
@media (max-width: 1001px) {
  .secret-phrase-container {
    overflow: auto;
  }
  .response-container {
    padding: 30px;
  }
}
</style>
