<template>
  <Badge :variant="value >= 0 ? 'success' : 'danger'">
    <span class="change" :class="value >= 0 ? 'change--positive' : 'change--negative'">
      <span class="change__arrow">{{ value >= 0 ? "▲" : "▼" }}</span>
      <span>{{ formatted }}%</span>
    </span>
  </Badge>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Badge from "@/shared/ui/Badge.vue"

const props = defineProps<{ value: number }>()

const formatted = computed(() => {
  if (!Number.isFinite(props.value)) return "-"
  return props.value.toFixed(2)
})
</script>

<style scoped>
.change {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.change__arrow {
  font-size: 11px;
}

.change--positive {
  color: var(--accent);
}

.change--negative {
  color: var(--danger);
}
</style>
