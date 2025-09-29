<template>
  <form class="form-container" @submit.prevent="setSecretPhrase">
    <div class="left-form-part">
      <input
        class="input"
        v-model="secretPhrase"
        type="text"
        placeholder="Введите передаваемый пароль"
      />
      <!--todo langs -->
      <MainButton class="submit-btn violet" type="submit" :disabled="!secretPhrase"
        >Передать!</MainButton
      >
      <Help class="error" v-if="error" :error="error"></Help>
    </div>
    <div class="divider"></div>
    <div class="right-form-part">
      <div class="right-form-part-options-container">
        <MainButton class="generate-btn violet" :on-click="generateSecret" type="button"
          >Сгенерировать</MainButton
        >
        <Select class="select" v-model="countOfSymbols" :options="optionsCountOfSymbols"></Select>
      </div>
      <!--todo langs i18n-->
      <p>Удалить пароль и сслыку спустя (что наступит раньше):</p>
      <div class="right-form-part-options-container">
        <Select class="select" v-model="expiresIn" :options="optionsExpiresIn"></Select>
        <Select class="select" v-model="countOfViews" :options="optionsCountOfViews"></Select>
      </div>
      <div class="right-form-part-options-container">
        <input type="checkbox" id="checkbox" class="checkbox" v-model="allowDeletions" />
        <label for="checkbox">Пользователи могут удалять пароль</label>
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
import Help from '@/components/inputs-helpers/Help.vue'
import router from '@/router/index.js'

const store = useStore()

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
const link = computed(() => store.state.link)

const setSecretPhrase = async () => {
  await store.dispatch('secretForm/setSecretPhrase')
  router.push(`/show/${link.value}`)
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
