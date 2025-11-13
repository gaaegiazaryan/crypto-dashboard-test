<template>
  <button class="theme" type="button" @click="toggle">
    <span v-if="theme === 'dark'">Тёмная</span>
    <span v-else>Светлая</span>
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useUiStore } from "@/shared/model/uiStore"

const ui = useUiStore()
const { theme } = storeToRefs(ui)

const toggle = () => {
  ui.toggleTheme()
}
</script>

<style scoped>
.theme {
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  padding: 6px 14px;
  background: rgba(15, 23, 42, 0.96);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}
</style>
