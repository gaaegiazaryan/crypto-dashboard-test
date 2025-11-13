<template>
  <span :class="['badge', variantClass]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{ variant?: "neutral" | "success" | "danger" }>()

const variantClass = computed(() => {
  if (props.variant === "success") return "badge--success"
  if (props.variant === "danger") return "badge--danger"
  return "badge--neutral"
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
}

.badge--neutral {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text);
}

.badge--success {
  background: var(--accent-soft);
  color: var(--accent);
}

.badge--danger {
  background: var(--danger-soft);
  color: var(--danger);
}
</style>
