<template>
  <form class="d-flex align-start form-container" @submit.prevent="setSecretPhrase">
    <div class="d-flex flex-column justify-start align-center ga-10 left-form-part">
      <ArealInput
        :value="secretPhrase"
        @input="(e) => (secretPhrase = e)"
        :label="t('formNote.label')"
        :required="true"
        size="L"
        style="width: 90%"
      />
      <ArealButton
        type="submit"
        size="L"
        width="90%"
        :text="t('buttons.pass')"
        :disabled="!secretPhrase"
        :loading="loading"
      />
    </div>
    <ArealDivider class="divider" :vertical="true" />
    <div class="d-flex flex-column justify-start align-center ga-6 right-form-part">
      <div class="d-flex ga-4 right-form-part-options-container">
        <ArealButton
          type="button"
          size="XS"
          width="50%"
          :text="t('buttons.generate')"
          @click="generateSecret"
        />
        <ArealDropbox
          :items="itemsCountOfSymbols"
          :value="countOfSymbols"
          text-param="label"
          value-param="value"
          size="XS"
          style="width: 50%"
          :label="t('dropboxText.labelCountOfSymbols')"
          :clearButton="false"
          :no-search="true"
          @input="(e) => (countOfSymbols = e)"
        />
      </div>

      <p>{{ t('formNote.deleteAfter') }}</p>
      <div class="d-flex ga-4 right-form-part-options-container">
        <ArealDropbox
          :items="itemsCountOfDays"
          :value="expiresIn"
          text-param="label"
          value-param="value"
          size="XS"
          style="width: 50%"
          :label="t('dropboxText.labelCountOfDays')"
          :clearButton="false"
          :no-search="true"
          @input="(e) => (expiresIn = e)"
        />
        <ArealDropbox
          :items="itemsCountOfViews"
          :value="countOfViews"
          text-param="label"
          value-param="value"
          size="XS"
          style="width: 50%"
          :label="t('dropboxText.labelCountOfViews')"
          :clearButton="false"
          :no-search="true"
          @input="(e) => (countOfViews = e)"
        />
      </div>
      <div class="d-flex ga-4 right-form-part-options-container">
        <ArealCheckbox
          id-checkbox="1"
          :label="t('formNote.allowDeletions')"
          :value="allowDeletions"
          @input="(e) => (allowDeletions = e)"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="js">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const { t } = useI18n()

const secretPhrase = ref(null)

const itemsCountOfSymbols = computed(() => [
  { label: `8 ${t('dropboxText.symbols')}`, value: 8 },
  { label: `12 ${t('dropboxText.symbols')}`, value: 12 },
  { label: `15 ${t('dropboxText.symbols')}`, value: 15 },
])
const itemsCountOfDays = computed(() => [
  { label: `1 ${t('dropboxText.day')}`, value: 86400000 },
  { label: `3 ${t('dropboxText.days1')}`, value: 259200000 },
  { label: `5 ${t('dropboxText.days2')}`, value: 432000000 },
  { label: `10 ${t('dropboxText.days2')}`, value: 864000000 },
])
const itemsCountOfViews = computed(() => [
  { label: `1 ${t('dropboxText.view')}`, value: 1 },
  { label: `3 ${t('dropboxText.views1')}`, value: 3 },
  { label: `5 ${t('dropboxText.views2')}`, value: 5 },
])
const countOfSymbols = computed({
  get: () => store.state.secretForm.countOfSymbols,
  set: (value) => store.commit('secretForm/setCountOfSymbols', value),
})
const countOfViews = computed({
  get: () => store.state.secretForm.countOfViews,
  set: (value) => store.commit('secretForm/setCountOfViews', value),
})
const expiresIn = computed({
  get: () => store.state.secretForm.expiresIn,
  set: (value) => store.commit('secretForm/setExpiresIn', value),
})
const allowDeletions = computed({
  get: () => store.state.secretForm.allowDeletions,
  set: (value) => store.commit('secretForm/setAllowDeletions', value),
})
const link = computed(() => store.state.link)
const loading = computed(() => store.state.loading)

const setSecretPhrase = async () => {
  const redirect = await store.dispatch('secretForm/setSecretPhrase')
  if (redirect) {
    store.commit('secretPhraseResponse/setPasswordIsLive', true)
    store.commit('secretPhraseResponse/setNotFound', false)
    router.push(`/show/${link.value}`)
  }
}
const generateSecret = async () => {
  const response = await store.dispatch('secretForm/generateSecretPhrase')
  secretPhrase.value = response.secretPhrase
}
watch(secretPhrase, () => {
  store.commit('secretForm/setSecretPhrase', secretPhrase.value)
})
</script>

<style scoped>
.form-container {
  min-width: 350px;
}
.left-form-part,
.right-form-part,
.form-container {
  height: 100%;
  width: 100%;
}
.right-form-part-options-container {
  width: 90%;
}
@media (max-width: 1001px) {
  .form-container {
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }
  .divider {
    display: none;
  }
  .left-form-part,
  .right-form-part {
    height: auto;
    flex: none;
  }
}
</style>
