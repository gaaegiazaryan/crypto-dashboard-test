<template>
  <div class="layout">
    <header class="layout__header">
      <slot name="header" />
    </header>
    <main class="layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 18px 32px;
}

.layout__header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding-bottom: 14px;
}

.layout__content {
  border-radius: 22px;
  padding: 18px 18px 26px;
  background: var(--bg-soft);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow:
    0 18px 45px rgba(15, 23, 42, 0.7),
    0 0 0 1px rgba(15, 23, 42, 0.6);
}

@media (max-width: 768px) {
  .layout {
    padding: 14px 10px 24px;
  }
  .layout__content {
    padding: 14px;
    border-radius: 16px;
  }
}
</style>
