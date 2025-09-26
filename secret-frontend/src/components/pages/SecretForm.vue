<template>
  <form class="form-container" @submit.prevent="setSecretPhrase">
    <div class="left-form-part">
      <Help v-if="errorText" :error="errorText"></Help>
      <input
        class="input"
        v-model="secretPhrase"
        type="text"
        placeholder="Введите передаваемый пароль"
      />
      <!--todo langs -->
      <MainButton class="submit-btn" type="submit">Передать!</MainButton>
    </div>
    <div class="divider"></div>
    <div class="right-form-part">
      <div class="right-form-part-options-container">
        <MainButton class="generate-btn" :on-click="generateSecret" type="button"
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
        <input type="checkbox" id="checkbox" class="checkbox" />
        <label for="checkbox">Пользователи могут удалять пароль</label>
      </div>
    </div>
  </form>
  <LinkContainer v-if="link" :link="link">ссылка</LinkContainer>
</template>

<script setup>
import MainButton from '@/components/buttons/MainButton.vue'
import Select from '@/components/inputs-helpers/Select.vue'
import {
  optionsCountOfSymbols,
  optionsCountOfViews,
  optionsExpiresIn,
} from '@/constants&interfaces/optionsForSelect.ts'
import { ref, computed } from 'vue'
import SecretServices from '@/services/secret-services.ts'
import LinkContainer from '@/components/inputs-helpers/LinkContainer.vue'
import Help from '@/components/inputs-helpers/Help.vue'

const link = ref(null)
const error = ref(null)
const secretPhrase = ref('')
const countOfViews = ref(1)
const countOfSymbols = ref(8)
const expiresIn = ref(86400000)

const errorText = computed(() => (secretPhrase.value ? null : error.value))

// todo store vuex
async function setSecretPhrase() {
  if (!secretPhrase.value) {
    error.value = 'Введите или сгенерируйте секретную фразу'
    return
  }
  try {
    const secretDto = {
      secretPhrase: secretPhrase.value,
      expiresInTimestamp: expiresIn.value,
      availableViews: countOfViews.value,
    }
    const response = await SecretServices.createSecret(secretDto)
    link.value = response.data.link
  } catch (e) {
    error.value = 'Что-то пошло не так, попробуйте позднее'
  }
}

async function generateSecret() {
  try {
    const response = await SecretServices.generateSecretPhrase(countOfSymbols.value)
    secretPhrase.value = response
  } catch (error) {
    error.value = 'Ошибка генерирования секретной фразы'
  }
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
  justify-content: start; /*todo посмотреть, как будет лучше*/
  align-items: center; /*todo посмотреть, как будет лучше*/
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
