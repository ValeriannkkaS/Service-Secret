<template>
  <HelpOptionsContainer>
    <MainButton v-if="allowDeletions" class="orange option-btn" :on-click="deleteSecretPhrase">{{
      t('buttons.delete')
    }}</MainButton>
    <MainButton :on-click="returnBack" class="violet option-btn">{{
      t('buttons.tryAgain')
    }}</MainButton>
  </HelpOptionsContainer>
  <div class="response-container">
    <p v-if="passwordInfo">{{ t('yourPassword.message') }}</p>
    <div class="secret-phrase-container" v-if="passwordInfo">
      <div v-if="loading" class="loading">
        <p>{{ t('loading.message') }}</p>
      </div>
      <div v-if="secretPhrase && show">
        <p>{{ secretPhrase }}</p>
      </div>
      <div v-if="secretPhrase && !show">
        <p>{{ unseenSecretPhrase }}</p>
      </div>
    </div>
    <MainButton
      v-if="!show && secretPhrase && passwordInfo"
      class="show-copy-btn orange"
      :on-click="showPassword"
      >{{ t('buttons.show') }}</MainButton
    >
    <MainButton
      v-if="show && secretPhrase && passwordInfo"
      class="show-copy-btn violet"
      :on-click="copyPassword"
      >{{ t('buttons.copy') }}</MainButton
    >
    <div v-if="!passwordInfo" class="secret-phrase-container">
      <p>{{ t('password.tryAgain') }}</p>
    </div>
  </div>
  <Modal :copied="copied" :deleted="''">{{ t('modal.passwordCopied') }}</Modal>
  <Modal :deleted="deleted" :copied="''">{{ t('modal.passwordDeleted') }}</Modal>
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import router from '@/router/index.ts'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import HelpOptionsContainer from '@/components/inputs-helpers/HelpOptionsContainer.vue'
import { useStore } from 'vuex'
import Modal from '@/components/inputs-helpers/Modal.vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const store = useStore()
const { t } = useI18n()
const copied = ref('')
const deleted = ref('')
const loading = computed(() => store.state.secretPhraseResponse.loading)
const secretPhrase = computed(() => store.state.secretPhraseResponse.secretPhrase)
const unseenSecretPhrase = computed(() => '*'.repeat(secretPhrase.value.length))
const allowDeletions = computed(() => store.state.passwordInfo?.[route.params.link]?.allowDeletions)
const show = computed(() => store.state.secretPhraseResponse.show)
const passwordInfo = computed(() => store.state.passwordInfo?.[route.params.link])

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
}
const deleteSecretPhrase = () => {
  store.dispatch('secretForm/deleteSecretPhrase', route.params.link)
  deleted.value = 'deleted'
  setTimeout(() => {
    deleted.value = ''
  }, 1000)
}

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
@media (max-width: 1001px) {
  .secret-phrase-container {
    overflow: auto;
  }
  .response-container {
    padding: 30px;
  }
}
</style>
