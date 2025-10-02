<template>
  <form class="form-container" @submit.prevent="setSecretPhrase">
    <div class="left-form-part">
      <input
        class="input"
        v-model="secretPhrase"
        type="text"
        :placeholder="t('formNote.placeholder')"
      />
      <MainButton class="submit-btn violet" type="submit" :disabled="!secretPhrase">{{
        t('buttons.pass')
      }}</MainButton>
      <transition name="fade" mode="out-in">
        <Help v-show="loading" class="help loading">{{ t('help.loadingText') }}</Help>
      </transition>
      <transition name="fade" mode="out-in">
        <Help v-if="error" class="help error">{{ t('help.errorText') }}</Help>
      </transition>
    </div>
    <div class="divider"></div>
    <div class="right-form-part">
      <div class="right-form-part-options-container">
        <MainButton class="generate-btn violet" :on-click="generateSecret" type="button">{{
          t('buttons.generate')
        }}</MainButton>
        <Select class="select" v-model="countOfSymbols" :options="optionsCountOfSymbols"></Select>
      </div>
      <p>{{ t('formNote.deleteAfter') }}</p>
      <div class="right-form-part-options-container">
        <Select class="select" v-model="expiresIn" :options="optionsExpiresIn"></Select>
        <Select class="select" v-model="countOfViews" :options="optionsCountOfViews"></Select>
      </div>
      <div class="right-form-part-options-container">
        <input type="checkbox" id="checkbox" class="checkbox" v-model="allowDeletions" />
        <label for="checkbox">{{ t('formNote.allowDeletions') }}</label>
      </div>
    </div>
  </form>
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import Select from '@/components/inputs-helpers/Select.vue'
import {
  optionsCountOfSymbols,
  optionsCountOfViews,
  optionsExpiresIn,
} from '@/constants&interfaces/optionsForSelect.ts'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import Help from '@/components/inputs-helpers/Help.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const { t } = useI18n()

const secretPhrase = computed({
  get: () => store.state.secretForm.secretPhrase,
  set: (value) => store.commit('secretForm/setSecretPhrase', value),
})
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
const error = computed(() => store.state.secretForm.error)
const loading = computed(() => store.state.secretForm.loading)
const link = computed(() => store.state.link)

const setSecretPhrase = async () => {
  const redirect = await store.dispatch('secretForm/setSecretPhrase')
  if (redirect) {
    router.push(`/show/${link.value}`)
  }
}
const generateSecret = async () => {
  store.dispatch('secretForm/generateSecretPhrase')
}
</script>

<style scoped>
/*контейнеры формы (общий контейнер формы и контейнеры элементов)*/
.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  min-width: 350px;
}
.left-form-part,
.right-form-part {
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1.5rem;
}
.right-form-part-options-container {
  width: 90%;
  display: flex;
  gap: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/*элементы формы*/
.submit-btn {
  height: 60px;
}
.input {
  padding: 0 16px;
  width: 90%;
  height: 62px;
  font-size: 20px;
  border-radius: 0.7rem;
  border: 1px solid rgba(173, 173, 173, 0.56);
  &:hover {
    border: 1px solid rgba(171, 104, 234, 0.56);
  }
}
.generate-btn,
.select {
  width: 50%;
  height: 35px;
}
.submit-btn,
.input {
  width: 90%;
}
.help {
  width: 100%;
  height: 60px;
}
.checkbox {
  accent-color: #9647ef;
  width: 22px;
  aspect-ratio: 1/1;
}
.divider {
  width: 3px;
  border-radius: 1px;
  height: 95%;
  background-color: rgba(173, 173, 173, 0.56);
}
@media (max-width: 1001px) {
  .form-container {
    flex-direction: column;
    justify-content: center;
    width: 100%;
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
