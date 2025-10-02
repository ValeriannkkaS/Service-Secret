<!--// todo https://help.areal.company/services/development_web/notes/frontend-develop.html изучи-->
<template>
  <div class="background">
    <div class="form-secret-phrase-container">
      <RouterView />
      <MainButton v-if="isRu" :on-click="() => (locale = 'en')" class="orange change-lang-btn"
        >EN</MainButton
      >
      <MainButton v-if="!isRu" :on-click="() => (locale = 'ru')" class="violet change-lang-btn"
        >RU</MainButton
      >
      <transition name="fade" mode="out-in">
        <Help v-if="loading" class="help loading">{{ t('help.loadingText') }}</Help>
      </transition>
      <transition name="fade" mode="out-in">
        <Help v-if="error" class="help error">{{ t('help.errorText') }}</Help>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainButton from '@/components/buttons/MainButton.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Help from '@/components/inputs-helpers/Help.vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

const { locale, t } = useI18n()

const isRu = computed(() => locale.value === 'ru')
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #d6cccc;
}
.form-secret-phrase-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 50px 35px;
  width: 1000px;
  height: 285px;
  background: #ebebeb;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
.change-lang-btn {
  position: fixed;
  top: 50px;
  right: 40px;
  height: 43px;
  width: 150px;
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
.help {
  width: 100%;
  height: 62px;
}
@media (max-width: 1001px) {
  .form-secret-phrase-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 0;
    min-width: 350px;
  }
  .help {
    position: absolute;
    bottom: 0;
    transform: translateY(-350%);
    width: 90%;
    margin-left: 50px;
  }
}
</style>
