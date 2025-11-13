<template>
  <section class="card">
    <slot />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  border-radius: 16px;
  padding: 14px 16px 16px;
  background: var(--bg-elevated);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.35);
}
</style>
