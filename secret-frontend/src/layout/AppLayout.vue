<template>
  <ArealApp>
    <div class="background d-flex justify-center align-center areal-bg--gray">
      <div
        class="d-flex flex-column justify-center align-center areal-bg--gray--lighten2 form-secret-phrase-container"
      >
        <RouterView />
        <ArealButton
          v-if="isRu"
          text="EN"
          size="M"
          :primary="false"
          @click="() => (locale = 'en')"
          class="change-lang-btn"
        ></ArealButton>
        <ArealButton
          v-if="!isRu"
          text="RU"
          size="M"
          :primary="false"
          @click="() => (locale = 'ru')"
          class="change-lang-btn"
        ></ArealButton>
        <ArealNotificationPanel
          :closable="true"
          :show="error"
          type="errorType"
          icon
          iconName="DangerCircle"
          size="M"
          class="help"
          :title="t('help.errorTitle')"
          :text="t('help.errorText')"
        />
        <!-- todo про transition-->
        <div v-show="loading">
          <ArealLineLoader top="10px" />
        </div>
      </div>
    </div>
  </ArealApp>
</template>

<script setup lang="js">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

const { locale, t } = useI18n()

const isRu = computed(() => locale.value === 'ru')
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: #d6cccc;
}
.form-secret-phrase-container {
  position: relative;
  padding: 50px 50px 35px;
  width: 1000px;
  height: 285px;
  box-shadow: 5px 5px 10px rgba(121, 121, 121, 0.63);
}
.change-lang-btn {
  position: fixed;
  top: 50px;
  right: 40px;
}
.help {
  position: fixed;
  top: 50px;
  left: 40px;
}
@media (max-width: 1001px) {
  .form-secret-phrase-container {
    width: 100%;
    height: 100%;
    padding: 0;
    min-width: 350px;
  }
  .help {
    top: auto;
    left: auto;
    bottom: 50px;
  }
}
</style>
