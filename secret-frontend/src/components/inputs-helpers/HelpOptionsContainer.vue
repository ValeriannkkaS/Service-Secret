<template>
  <div class="help-options-container1">
    <p v-if="passwordInfo && !lastView" class="help">
      {{ t('options.passwordExpired') }} {{ date }} {{ t('options.orAfter') }}
      {{ passwordInfo.remainingViewsCount }} {{ t('options.views') }}
    </p>
    <p v-if="lastView && passwordIsLive && passwordInfo" class="error">
      {{ t('options.lastView') }}
    </p>
    <p v-if="!passwordIsLive && !passwordInfo" class="error">{{ t('options.nonePassword') }}</p>
    <div class="options-buttons-container1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const store = useStore()
const { t } = useI18n()

const link = route.params.link
const passwordInfo = computed(() => store.state?.passwordInfo?.[link])
const expiresAt = computed(() => passwordInfo?.value?.expiresAt)
const date = computed(() => new Date(expiresAt?.value).toLocaleDateString())
const lastView = computed(() => passwordInfo?.value?.remainingViewsCount === 0)
const passwordIsLive = computed(() => store.state.secretPhraseResponse?.passwordIsLive)
</script>

<style scoped>
.help-options-container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  padding: 10px 50px;
  background: #a3b0c6;
  border-radius: 30px 30px 0 0;
  width: 100%;
}
.options-buttons-container1 {
  display: flex;
  gap: 17px;
}
.error {
  color: #ca0101;
}
@media (max-width: 1001px) {
  .help-options-container1 {
    flex-direction: column;
    align-items: start;

    justify-content: center;
    gap: 16px;
    border-radius: 0;
    position: static;
    top: 0;
  }
  .help {
    width: 250px;
  }
}
</style>
