<template>
  <HelpOptionsContainer />
  <div class="d-flex flex-column align-start justify-space-around main-container">
    <p class="note" v-if="passwordInfo">{{ t('password.available') }}</p>
    <div class="d-flex flex-column align-center justify-space-between show-copy-link-container">
      <div class="d-flex align-center justify-start link-container">
        <p class="link">{{ passwordInfo ? fullLink : t('password.tryAgain') }}</p>
      </div>
      <ArealButton
        v-if="fullLink"
        size="L"
        :text="t('buttons.copy')"
        width="100%"
        @click="copyLink"
      />
    </div>
  </div>
  <ArealSnackbar
    v-show="copied"
    icon
    iconName="Copy"
    type="success"
    :text="t('modal.linkCopied')"
    size="L"
    class="snackbar"
  />
</template>

<script setup lang="js">
import HelpOptionsContainer from '@/components/inputs-helpers/HelpOptionsContainer.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { computed, onBeforeUnmount, ref } from 'vue'

const { t } = useI18n()
const route = useRoute()
const store = useStore()
const copied = ref(false)
const timeoutId = ref(null)

const link = route.params.link
const passwordInfo = computed(() => store.state.passwordInfo?.[link] || null)

const domain = window.location.host
const fullLink = computed(() =>
  passwordInfo.value ? `http://${domain}/${passwordInfo.value.link}` : null,
)

const copyLink = () => {
  navigator.clipboard.writeText(fullLink.value || '')
  copied.value = true
  clearTimeout(timeoutId.value)
  timeoutId.value = setTimeout(() => {
    copied.value = false
  }, 3000)
}

onBeforeUnmount(() => clearTimeout(timeoutId.value))
</script>

<style scoped>
.main-container {
  width: 100%;
}
.show-copy-link-container {
  gap: 16px;
  width: 100%;
}
.link-container {
  width: 100%;
  height: 62px;
  overflow-x: auto;
  padding: 0 16px;
  background: #fff;
  border: solid 2px #0082c5;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.link {
  white-space: nowrap;
  font-size: 20px;
}
.note {
  margin-bottom: 16px;
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
  .main-container {
    padding: 24px;
  }
}
</style>
