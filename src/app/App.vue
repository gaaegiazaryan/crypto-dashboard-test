<template>
  <div :class="['app-root', themeClass]">
    <Layout>
      <template #header>
        <AppHeader />
      </template>
      <RouterView />
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { RouterView } from "vue-router"
import Layout from "@/shared/ui/Layout.vue"
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue"
import { useUiStore } from "@/shared/model/uiStore"

const ui = useUiStore()
const themeClass = computed(() => (ui.theme === "dark" ? "theme-dark" : "theme-light"))
</script>
