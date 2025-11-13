<template>
  <button class="favorite" type="button" @click.stop="toggle">
    <span v-if="active">★</span>
    <span v-else>☆</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUiStore } from "@/shared/model/uiStore"

const props = defineProps<{ id: string }>()

const ui = useUiStore()
const active = computed(() => ui.isFavorite(props.id))

const toggle = () => {
  ui.toggleFavorite(props.id)
}
</script>

<style scoped>
.favorite {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  color: var(--accent);
}
</style>
