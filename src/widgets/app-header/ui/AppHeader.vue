<template>
  <div class="header">
    <div class="header__title">
      <div class="header__logo">
        <span class="header__dot" />
        <span class="header__logo-text">CD</span>
      </div>
      <div>
        <h1 class="header__heading">Crypto Dashboard</h1>
      </div>
    </div>
    <div class="header__right">
      <span v-if="lastUpdated" class="header__updated">Обновлено {{ relativeUpdated }}</span>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import ThemeSwitch from "@/features/theme-switcher/ui/ThemeSwitch.vue"
import { useAssetStore } from "@/entities/asset/model/assetStore"

const store = useAssetStore()

const lastUpdated = computed(() => store.lastUpdated)

const relativeUpdated = computed(() => {
  if (!lastUpdated.value) return "только что"
  const diff = Date.now() - lastUpdated.value
  const minutes = Math.round(diff / 60000)
  if (minutes <= 0) return "только что"
  if (minutes === 1) return "минуту назад"
  if (minutes < 5) return `${minutes} минуты назад`
  if (minutes < 60) return `${minutes} минут назад`
  const hours = Math.round(minutes / 60)
  if (hours === 1) return "час назад"
  return `${hours} ч. назад`
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.header__title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__logo {
  width: 32px;
  height: 32px;
  border-radius: 11px;
  background: radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.4), transparent 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header__dot {
  position: absolute;
  top: 7px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.9);
}

.header__logo-text {
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text);
}

.header__heading {
  font-size: 20px;
  margin: 0 0 2px;
}

.header__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: var(--text-muted);
}

.header__updated {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
