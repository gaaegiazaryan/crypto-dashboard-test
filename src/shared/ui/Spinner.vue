<template>
  <div class="spinner" role="status" aria-live="polite">
    <div class="spinner__circle" />
    <span v-if="label" class="spinner__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<style scoped>
.spinner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.spinner__circle {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid rgba(148, 163, 184, 0.35);
  border-top-color: var(--accent);
  animation: spin 0.6s linear infinite;
}

.spinner__label {
  letter-spacing: 0.02em;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
