<template>
  <h1>Секретная фраза:</h1>
  <div class="secret-phrase-container">
    <div v-if="loading" class="loading">
      <p>Загрузка...</p>
    </div>
    <div v-if="error" class="error">
      <p>
        Срок действия секретной фразы истек, либо ссылка недействительна или исчерпала все свои
        просмотры
      </p>
    </div>
    <div v-if="secretPhrase">
      <p>{{ secretPhrase }}</p>
    </div>
  </div>
  <MainButton :on-click="returnBack" class="large">Вернуться на главную</MainButton>
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
.secret-phrase-container {
  width: 80%;
  min-width: 700px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  border-radius: 30px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.error {
  color: red;
}
</style>
