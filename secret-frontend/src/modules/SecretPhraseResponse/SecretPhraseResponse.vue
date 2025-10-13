<template>
  <HelpOptionsContainer />
  <div v-if="!notFound" class="d-flex flex-column align-start response-container">
    <p v-if="passwordIsLive">{{ t('yourPassword.message') }}</p>
    <div class="d-flex align-center justify-start secret-phrase-container">
      <div v-if="secretPhrase && show && passwordIsLive">
        <p>{{ secretPhrase }}</p>
      </div>
      <div v-if="!show && passwordIsLive">
        <p>********</p>
      </div>
      <div v-if="!passwordIsLive">
        <p>{{ t('password.tryAgain') }}</p>
      </div>
    </div>
    <ArealButton
      v-if="!show && passwordIsLive"
      size="L"
      width="100%"
      :text="t('buttons.show')"
      @click="showPassword"
    />
    <ArealButton
      v-if="show && secretPhrase && passwordIsLive"
      size="L"
      width="100%"
      :text="t('buttons.copy')"
      @click="copyPassword"
    />
  </div>
  <ArealNotFound v-if="notFound" />
  <ArealSnackbar
    v-show="copied"
    icon
    iconName="Copy"
    type="success"
    :text="t('modal.passwordCopied')"
    size="L"
    class="snackbar"
  />
</template>

<script setup lang="js">
import { useRoute } from 'vue-router'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import HelpOptionsContainer from '@/components/inputs-helpers/HelpOptionsContainer.vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const store = useStore()
const { t } = useI18n()
const copied = ref(false)
const timeoutId = ref(null)
const secretPhrase = computed(() => store.state.secretPhraseResponse.secretPhrase)
const allowDeletions = computed(() => store.state.passwordInfo?.[route.params.link]?.allowDeletions)
const show = computed(() => store.state.secretPhraseResponse.show)
const notFound = computed(() => store.state.secretPhraseResponse.notFound)
const passwordIsLive = computed(() => store.state.secretPhraseResponse.passwordIsLive)

const checkSecretPhrase = async () =>
  store.dispatch('secretPhraseResponse/checkSecretPhrase', route.params.link)

const showPassword = async () => {
  await store.dispatch('secretPhraseResponse/getSecretPhraseByLink', route.params.link)
  store.commit('secretPhraseResponse/setShow', true)
}
const copyPassword = () => {
  navigator.clipboard.writeText(secretPhrase.value)
  copied.value = true
  clearTimeout(timeoutId.value)
  timeoutId.value = setTimeout(() => {
    copied.value = false
  }, 3000)
}

watch(() => route.params.link, checkSecretPhrase, { immediate: true })

onBeforeUnmount(() => clearTimeout(timeoutId.value))
</script>

<style scoped>
.response-container {
  gap: 17px;
  width: 100%;
}
.secret-phrase-container p {
  font-size: 20px;
  white-space: nowrap;
}
.secret-phrase-container {
  width: 100%;
  height: 62px;
  overflow-x: auto;
  padding: 0 16px;
  background: #fff;
  border: solid 2px #0082c5;
}
.snackbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 1000px;
  transform: translateY(-200%);
}
@media (max-width: 1001px) {
  .snackbar {
    position: fixed;
    top: 0;
    left: 20px;
    transform: translateY(350%);
  }
  .secret-phrase-container {
    overflow: auto;
  }
  .response-container {
    padding: 30px;
  }
}
</style>
