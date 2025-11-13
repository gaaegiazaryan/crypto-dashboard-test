<template>
  <div class="search">
    <span class="search__icon">🔍</span>
    <input
      class="search__input"
      type="text"
      :value="modelValue"
      placeholder="Поиск по названию или тикеру"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  "update:modelValue": [val: string]
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<style scoped>
.search {
  position: relative;
  flex: 1;
}

.search__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.7;
}

.search__input {
  width: 100%;
  border-radius: 9px;
  border: 1px solid rgba(148, 163, 184, 0.55);
  padding: 7px 12px 7px 30px;
  background: rgba(15, 23, 42, 0.95);
  color: var(--text);
  font-size: 14px;
  outline: none;
}

.search__input::placeholder {
  color: var(--text-muted);
}
</style>
