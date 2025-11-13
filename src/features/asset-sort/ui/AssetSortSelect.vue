<template>
  <div class="sort">
    <label class="sort__label">
      Сортировка
      <select class="sort__select" :value="modelValue" @change="onChange">
        <option value="rank">По рангу</option>
        <option value="name">По названию</option>
        <option value="price">По цене</option>
        <option value="change">По изменению</option>
        <option value="marketCap">По капитализации</option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  "update:modelValue": [val: string]
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit("update:modelValue", target.value)
}
</script>

<style scoped>
.sort__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.sort__select {
  border-radius: 9px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  padding: 6px 18px 6px 10px;
  background: rgba(15, 23, 42, 0.95);
  color: var(--text);
  font-size: 13px;
}
</style>
