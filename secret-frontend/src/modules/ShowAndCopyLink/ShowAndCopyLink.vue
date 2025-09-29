<template>
  <HelpOptionsContainer v-if="passwordInfo">
    <MainButton class="orange option-btn">Удалить</MainButton>
    <MainButton class="violet option-btn">Передать еще</MainButton>
  </HelpOptionsContainer>
  <div v-if="passwordInfo" class="main-container">
    <p class="note">Пароль доступен по ссылке:</p>
    <div class="show-copy-link-container">
      <div class="link-container">
        <p class="link">{{ fullLink }}</p>
      </div>
      <MainButton :on-click="copyLink" class="violet copy-btn">Скопировать</MainButton>
    </div>
  </div>
  <div class="modal" :class="copied">
    <p>Ссылка была скопирована в буфер обмена</p>
  </div>
</template>

<script setup>
import HelpOptionsContainer from '@/modules/helpOptionsContainer/HelpOptionsContainer.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const route = useRoute()
const store = useStore()
const copied = ref('')

const link = route.params.link
const passwordInfo = computed(() => store.state.passwordInfo[link])

const domain = window.location.host
const fullLink = computed(() => `http://${domain}/${passwordInfo.value.link}`)

const copyLink = () => {
  navigator.clipboard.writeText(fullLink.value)
  copied.value = 'active'
  setTimeout(() => {
    copied.value = ''
  }, 1000)
}
</script>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}
.show-copy-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}
.copy-btn,
.link-container {
  width: 100%;
  height: 62px;
}
.link-container {
  display: flex;
  align-items: center;
  overflow-x: auto;
  justify-content: start;
  padding: 0 16px;
  background: rgba(191, 206, 243, 0.7);
  border: solid 2px #4d5bf3;
  border-radius: 0.7rem;
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
.modal {
  font-size: 25px;
  position: absolute;
  top: 0;
  transform: translateY(-200%);
  background-color: rgba(157, 80, 244, 0.84);
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  color: white;
  border: 3px solid rgb(125, 27, 239);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.modal.active {
  opacity: 1;
}
@media (max-width: 1001px) {
  .show-copy-link-container {
    flex-direction: column;
    gap: 16px;
  }
  .main-container {
    padding: 24px;
  }
}
</style>
