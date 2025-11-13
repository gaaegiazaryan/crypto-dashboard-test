<template>
  <div class="table">
    <div class="table__head">
      <div
          v-for="column in columns"
          :key="column.key"
          class="table__cell table__cell--head"
          :class="column.align === 'right' ? 'table__cell--right' : ''"
          @click="() => handleSort(column)"
      >
        <span>{{ column.label }}</span>
        <span v-if="column.sortable" class="table__sort">
          <span
              :class="[
              'table__chevron',
              sortKey === column.key && sortOrder === 'asc' ? 'table__chevron--active' : ''
            ]"
          >
            ▲
          </span>
          <span
              :class="[
              'table__chevron',
              sortKey === column.key && sortOrder === 'desc' ? 'table__chevron--active' : ''
            ]"
          >
            ▼
          </span>
        </span>
      </div>
    </div>
    <div v-if="rows.length === 0" class="table__empty">
      <slot name="empty">Нет данных</slot>
    </div>
    <div v-else class="table__body">
      <div v-for="row in rows" :key="row.id" class="table__row">
        <div
            v-for="column in columns"
            :key="column.key"
            class="table__cell"
            :class="column.align === 'right' ? 'table__cell--right' : ''"
        >
          <slot :name="`cell:${column.key}`" :row="row">
            {{ row[column.key] }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type TableColumn = {
  key: string
  label: string
  sortable?: boolean
  align?: "left" | "right"
}

export type SortOrder = "asc" | "desc" | null

const props = defineProps<{
  columns: TableColumn[]
  rows: Record<string, any>[]
  sortKey?: string | null
  sortOrder?: SortOrder
}>()

const emit = defineEmits<{
  sort: [key: string]
}>()

const handleSort = (column: TableColumn) => {
  if (!column.sortable) return
  emit("sort", column.key)
}
</script>

<style scoped>
.table {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--border-soft);
  overflow: hidden;
  background: var(--bg-elevated);
}

.table__head {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  padding: 9px 14px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  color: var(--text-muted);
  background: var(--bg-soft);
}

.table__body {
  max-height: 520px;
  overflow-y: auto;
}

.table__row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  padding: 9px 14px;
  font-size: 14px;
  align-items: center;
  border-top: 1px solid var(--border-soft);
  background: var(--bg-elevated);
}

.table__row:nth-child(2n) {
  background: var(--bg-soft);
}

.table__row:hover {
  background: var(--accent-soft);
}

.table__cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table__cell--head {
  user-select: none;
  cursor: default;
}

.table__cell--right {
  justify-content: flex-end;
}

.table__sort {
  display: inline-flex;
  flex-direction: column;
  margin-left: 6px;
  font-size: 10px;
  opacity: 0.6;
}

.table__chevron {
  line-height: 10px;
  opacity: 0.25;
}

.table__chevron--active {
  opacity: 1;
}

.table__empty {
  padding: 16px;
  font-size: 14px;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .table,
  .table__row,
  .table__head {
    display: block;
  }
  .table__head {
    display: none;
  }
  .table__row {
    padding: 12px 12px;
  }
  .table__cell {
    justify-content: space-between;
    padding: 4px 0;
  }
}
</style>
