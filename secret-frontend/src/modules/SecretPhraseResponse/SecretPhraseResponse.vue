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
      <div v-if="secretPhrase && show">
        <p>{{ secretPhrase }}</p>
      </div>
      <div v-if="secretPhrase && !show">
        <p>{{ unseenSecretPhrase }}</p>
      </div>
    </div>
    <MainButton v-if="!show && secretPhrase" class="show-copy-btn orange" :on-click="showPassword"
      >Показать пароль</MainButton
    >
    <MainButton v-if="show && secretPhrase" class="show-copy-btn violet" :on-click="copyPassword"
      >Скопировать</MainButton
    >
  </div>
  <div class="modal" :class="copied">
    <p>Пароль был скопирована в буфер обмена</p>
  </div>
  <!--  todo можно вынести в компонент-->
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import HelpOptionsContainer from '@/modules/helpOptionsContainer/HelpOptionsContainer.vue'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const copied = ref('')
const loading = computed(() => store.state.secretPhraseResponse.loading)
const error = computed(() => store.state.secretPhraseResponse.error)
const secretPhrase = computed(() => store.state.secretPhraseResponse.secretPhrase)
const unseenSecretPhrase = computed(() => '*'.repeat(secretPhrase.value.length))
const show = computed(() => store.state.secretPhraseResponse.show)

// todo стрелочные функции
const getSecretPhrase = async () =>
  store.dispatch('secretPhraseResponse/getSecretPhraseByLink', route.params.link)

const returnBack = () => router.push('/')
const showPassword = () => store.commit('secretPhraseResponse/setShow', true)
const copyPassword = () => {
  navigator.clipboard.writeText(secretPhrase.value)
  copied.value = 'active'
  setTimeout(() => {
    copied.value = ''
  }, 1000)
  console.log(show)
}
console.log(show)

watch(() => route.params.link, getSecretPhrase, { immediate: true })
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
@media (max-width: 1001px) {
  .secret-phrase-container {
    overflow: auto;
  }
  .response-container {
    padding: 30px;
  }
  .modal {
    position: absolute;
    top: 0;
    font-size: 16px;
    transform: translateY(100%);
    width: 90%;
  }
}
</style>
