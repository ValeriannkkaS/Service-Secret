<template>
  <div class="help-options-container1">
    <p v-if="passwordInfo && !lastView" class="help">
      Ваш пароль истечет {{ date }} или через {{ passwordInfo.remainingViewsCount }} просмотр(ов)
    </p>
    <p v-if="lastView" class="error">
      Это последний просмотр этого пароля, после него он будет удален
    </p>
    <p v-if="!passwordInfo" class="error">Нет пароля по такой ссылке, попробуйте передать еще</p>
    <div class="options-buttons-container1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const link = route.params.link
const passwordInfo = computed(() => store.state.passwordInfo[link])
const expiresAt = computed(() => passwordInfo.value.expiresAt)
const date = computed(() => new Date(expiresAt.value).toLocaleDateString())
const lastView = computed(() => passwordInfo.value.remainingViewsCount === 0)
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
