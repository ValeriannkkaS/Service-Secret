<template>
  <div class="areal-bg--gray--lighten1 d-flex justify-space-between help-options-container">
    <p v-if="passwordInfo && !lastView" class="help">
      {{ t('options.passwordExpired') }} {{ date }} {{ t('options.orAfter') }}
      {{ passwordInfo.remainingViewsCount }} {{ t('options.views') }}
    </p>
    <p v-if="lastView && passwordIsLive && passwordInfo" class="error">
      {{ t('options.lastView') }}
    </p>
    <p v-if="!passwordIsLive && !passwordInfo && !notFound" class="error">
      {{ t('options.alreadyExpiredOrDeleted') }}
    </p>
    <p v-if="notFound" class="error">{{ t('options.nonePassword') }}</p>
    <div class="options-buttons-container1">
      <ArealButton
        :primary="false"
        size="XS"
        :text="t('buttons.delete')"
        v-if="allowDeletions"
        @click="deleteSecretPhrase"
        :icon-left="{ iconName: 'DeleteIcon' }"
      />
      <ArealButton
        :primary="false"
        size="XS"
        :text="t('buttons.tryAgain')"
        @click="() => router.push('/')"
        :icon-left="{ iconName: 'TriangleLeftIcon' }"
      />
    </div>
    <ArealSnackbar
      v-show="deleted"
      icon
      iconName="CheckCircle"
      type="success"
      :text="t('modal.passwordDeleted')"
      size="L"
      class="snackbar"
    />
  </div>
</template>

<script setup lang="js">
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const deleted = ref(false)

const link = route.params.link
const passwordInfo = computed(() => store.state?.passwordInfo?.[link])
const expiresAt = computed(() => passwordInfo?.value?.expiresAt)
const date = computed(() => new Date(expiresAt?.value).toLocaleDateString())
const lastView = computed(() => passwordInfo?.value?.remainingViewsCount === 0)
const passwordIsLive = computed(() => store.state.secretPhraseResponse?.passwordIsLive)
const allowDeletions = computed(() => store.state.passwordInfo?.[route.params.link]?.allowDeletions)
const notFound = computed(() => store.state.secretPhraseResponse.notFound)

const deleteSecretPhrase = async () => {
  await store.dispatch('secretForm/deleteSecretPhrase', route.params.link)
  deleted.value = true
  setTimeout(() => {
    deleted.value = false
  }, 3000)
}
</script>

<style scoped>
.help-options-container {
  align-items: center;
  position: absolute;
  top: 0;
  padding: 10px 50px;
  width: 100%;
}
.options-buttons-container1 {
  display: flex;
  gap: 17px;
}
.error {
  color: #ca0101;
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
  .help-options-container {
    flex-direction: column;
    align-items: start;

    justify-content: center;
    gap: 16px;
    position: static;
    top: 0;
  }
  .help {
    width: 250px;
  }
}
</style>
