<template>
  <Card>
    <div class="toolbar">
      <AssetSearchInput v-model="search" />
    </div>

    <Table
        :columns="columns"
        :rows="computedRows"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        @sort="onSort"
    >
      <template #empty>
        <div class="empty">
          <p v-if="search">Ничего не найдено по запросу «{{ search }}»</p>
          <p v-else>Нет данных</p>
        </div>
      </template>

      <template #cell:name="{ row }">
        <div class="asset">
          <RouterLink
              :to="{ name: 'asset-details', params: { id: row.id } }"
              class="asset__link"
          >
            <span class="asset__rank">#{{ row.rank }}</span>
            <span class="asset__name">{{ row.name }}</span>
            <span class="asset__symbol">{{ row.symbol }}</span>
          </RouterLink>
          <FavoriteToggle :id="row.id" />
        </div>
      </template>

      <template #cell:priceUsd="{ row }">
        <span class="mono">{{ formatCurrency(row.priceUsd, 6) }}</span>
      </template>

      <template #cell:changePercent24Hr="{ row }">
        <AssetChangeBadge :value="row.changePercent24Hr" />
      </template>

      <template #cell:marketCapUsd="{ row }">
        <span class="mono">{{ formatCurrency(row.marketCapUsd) }}</span>
      </template>

      <template #cell:volumeUsd24Hr="{ row }">
        <span class="mono">{{ formatCurrency(row.volumeUsd24Hr) }}</span>
      </template>
    </Table>

    <div v-if="isLoading" class="overlay">
      <Spinner label="Обновляем данные..." />
    </div>

    <div v-if="error" class="error">
      <span>{{ error }}</span>
      <button type="button" @click="reload">Повторить</button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import Card from "@/shared/ui/Card.vue"
import Table, { type TableColumn, type SortOrder } from "@/shared/ui/Table.vue"
import Spinner from "@/shared/ui/Spinner.vue"
import AssetSearchInput from "@/features/asset-search/ui/AssetSearchInput.vue"
import FavoriteToggle from "@/features/favorites-toggle/ui/FavoriteToggle.vue"
import AssetChangeBadge from "@/entities/asset/ui/AssetChangeBadge.vue"
import { useAssetStore } from "@/entities/asset/model/assetStore"
import { usePolling } from "@/shared/lib/composables/usePolling"
import { formatCurrency } from "@/shared/lib/number"

const store = useAssetStore()
const { sortedByRank, isLoading, error } = storeToRefs(store)

const search = ref("")
const sortKey = ref<string | null>("rank")
const sortOrder = ref<SortOrder>("asc")

const columns: TableColumn[] = [
  { key: "name", label: "Актив", sortable: true },
  { key: "priceUsd", label: "Цена", sortable: true, align: "right" },
  { key: "changePercent24Hr", label: "24ч", sortable: true, align: "right" },
  { key: "marketCapUsd", label: "Капитализация", sortable: true, align: "right" },
  { key: "volumeUsd24Hr", label: "Объём 24ч", sortable: true, align: "right" }
]

const computedRows = computed(() => {
  let items = sortedByRank.value

  const query = search.value.trim().toLowerCase()
  if (query) {
    items = items.filter(
        x =>
            x.name.toLowerCase().includes(query) ||
            x.symbol.toLowerCase().includes(query)
    )
  }

  const key = sortKey.value
  const dir = sortOrder.value

  if (dir && key) {
    items = [...items].sort((a: any, b: any) => {
      const left = a[key]
      const right = b[key]
      if (typeof left === "string" && typeof right === "string") {
        return dir === "asc" ? left.localeCompare(right) : right.localeCompare(left)
      }
      return dir === "asc" ? left - right : right - left
    })
  }

  return items
})

const onSort = (key: string) => {
  if (sortKey.value === key) {
    if (sortOrder.value === "asc") sortOrder.value = "desc"
    else if (sortOrder.value === "desc") sortOrder.value = null
    else sortOrder.value = "asc"
  } else {
    sortKey.value = key
    sortOrder.value = "asc"
  }
}

const reload = () => {
  store.loadAssets()
}

usePolling(() => store.loadAssets(), 30_000)
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.asset {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.asset__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.asset__rank {
  font-size: 12px;
  color: var(--text-muted);
}

.asset__name {
  font-weight: 500;
}

.asset__symbol {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--text-muted);
}

.mono {
  font-variant-numeric: tabular-nums;
}

.overlay {
  position: sticky;
  inset: auto 0 0 0;
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
}

.error {
  margin-top: 10px;
  padding: 9px 11px;
  border-radius: 10px;
  background: var(--danger-soft);
  color: var(--danger);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.error button {
  border-radius: 999px;
  border: 1px solid var(--danger);
  background: transparent;
  color: inherit;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 12px;
}

.empty {
  padding: 14px 0;
  color: var(--text-muted);
  font-size: 14px;
}
</style>
