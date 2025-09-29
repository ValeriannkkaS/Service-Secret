<template>
  <HelpOptionsContainer>
    <MainButton v-if="allowDeletions" class="orange option-btn" :on-click="deleteSecretPhrase"
      >Удалить</MainButton
    >
    <MainButton class="violet option-btn" :on-click="returnBack">Передать еще</MainButton>
  </HelpOptionsContainer>
  <div v-if="passwordInfo" class="main-container">
    <p class="note">Пароль доступен по ссылке:</p>
    <div class="show-copy-link-container">
      <div class="link-container">
        <p class="link">{{ fullLink }}</p>
      </div>
      <MainButton :on-click="copyLink" class="violet copy-btn">Скопировать</MainButton>
    </div>
  </div>
  <div v-if="!passwordInfo" class="main-container">
    <div class="show-copy-link-container">
      <div class="link-container">
        <p class="link">Попробуйте передать еще раз</p>
      </div>
    </div>
  </div>
  <Modal :copied="copied" :deleted="''">Ссылка была скопирована в буфер обмена</Modal>
  <Modal :copied="''" :deleted="deleted">Пароль был удален</Modal>
</template>

<script setup>
import HelpOptionsContainer from '@/components/inputs-helpers/HelpOptionsContainer.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import Modal from '@/components/inputs-helpers/Modal.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()
const copied = ref('')
const deleted = ref('')

const link = route.params.link
const passwordInfo = computed(() => store.state.passwordInfo?.[link] || null)
const allowDeletions = computed(() => store.state.passwordInfo?.[route.params.link]?.allowDeletions)

const domain = window.location.host
const fullLink = computed(() =>
  passwordInfo ? `http://${domain}/${passwordInfo?.value?.link}` : null,
)

const deleteSecretPhrase = () => {
  store.dispatch('secretForm/deleteSecretPhrase', link)
  deleted.value = 'deleted'
  setTimeout(() => {
    deleted.value = ''
  }, 1000)
}
const copyLink = () => {
  navigator.clipboard.writeText(fullLink.value)
  copied.value = 'active'
  setTimeout(() => {
    copied.value = ''
  }, 1000)
}
const returnBack = () => router.push('/')
</script>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}
.show-copy-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}
.copy-btn,
.link-container {
  width: 100%;
  height: 62px;
}
.link-container {
  display: flex;
  align-items: center;
  overflow-x: auto;
  justify-content: start;
  padding: 0 16px;
  background: rgba(191, 206, 243, 0.7);
  border: solid 2px #4d5bf3;
  border-radius: 0.7rem;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.link {
  white-space: nowrap;
  font-size: 20px;
}
.note {
  margin-bottom: 16px;
}
@media (max-width: 1001px) {
  .show-copy-link-container {
    flex-direction: column;
    gap: 16px;
  }
  .main-container {
    padding: 24px;
  }
}
</style>
