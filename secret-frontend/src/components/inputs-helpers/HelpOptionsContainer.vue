<template>
  <div class="d-flex justify-space-between help-options-container">
    <ArealNotificationPanel
      v-if="passwordInfo && !lastView"
      icon
      iconName="infoSquare"
      size="M"
      style="width: 100%"
      :title="t('options.infoPassword')"
      :text="`${t('options.passwordExpired')} ${date} ${t('options.orAfter')} ${passwordInfo.remainingViewsCount} ${t('options.views')} `"
      type="infoType"
    ></ArealNotificationPanel>
    <ArealNotificationPanel
      v-if="lastView && passwordIsLive && passwordInfo"
      icon
      iconName="DangerCircle"
      size="M"
      style="width: 100%"
      :title="t('options.warning')"
      :text="t('options.lastView')"
      type="warningType"
    ></ArealNotificationPanel>
    <ArealNotificationPanel
      v-if="!passwordIsLive && !passwordInfo && !notFound"
      icon
      iconName="DangerCircle"
      size="M"
      style="width: 100%"
      :title="t('options.notFound')"
      :text="t('options.alreadyExpiredOrDeleted')"
      type="errorType"
    ></ArealNotificationPanel>
    <ArealNotificationPanel
      v-if="notFound"
      icon
      iconName="DangerCircle"
      size="M"
      style="width: 100%"
      :title="t('options.notFound')"
      :text="t('options.nonePassword')"
      type="errorType"
    ></ArealNotificationPanel>
    <div class="options-buttons-container1">
      <ArealLink
        v-if="allowDeletions"
        :text="t('buttons.delete')"
        :icon-left="{ iconName: 'DeleteIcon' }"
        @click="deleteSecretPhrase"
      />
      <ArealLink
        :text="t('buttons.tryAgain')"
        @click="() => router.push('/')"
        :icon-left="{ iconName: 'TriangleLeftIcon' }"
      />
      <!--      <ArealButton
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
      />-->
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
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const deleted = ref(false)
const timeoutId = ref(null)

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
  clearTimeout(timeoutId.value)
  timeoutId.value = setTimeout(() => {
    deleted.value = false
  }, 3000)
}

onBeforeUnmount(() => clearTimeout(timeoutId.value))
</script>

<style scoped>
.help-options-container {
  position: relative;
  align-items: center;
  top: 0;
  width: 100%;
}
.options-buttons-container1 {
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: flex;
  gap: 17px;
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
}
</style>
