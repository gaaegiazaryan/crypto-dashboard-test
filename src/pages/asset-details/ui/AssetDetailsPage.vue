<template>
  <section class="details">
    <RouterLink to="/" class="back">← Ко всем активам</RouterLink>

    <div v-if="!asset && isLoading" class="center">
      <Spinner label="Загружаем данные" />
    </div>

    <div v-else-if="!asset" class="center">
      <p>Актив не найден</p>
    </div>

    <div v-else class="grid">
      <Card>
        <div class="summary">
          <div>
            <h2 class="title">
              {{ asset.name }}
              <span class="symbol">{{ asset.symbol }}</span>
            </h2>
            <p class="rank">Rank #{{ asset.rank }}</p>
          </div>
          <div class="summary__right">
            <p class="price">{{ price }}</p>
            <AssetChangeBadge :value="asset.changePercent24Hr" />
          </div>
        </div>

        <div class="stats">
          <div class="stats__item">
            <span class="stats__label">Капитализация</span>
            <span class="stats__value">{{ marketCap }}</span>
          </div>
          <div class="stats__item">
            <span class="stats__label">Объём 24ч</span>
            <span class="stats__value">{{ volume }}</span>
          </div>
        </div>
      </Card>

      <AssetPriceChart :is-loading="isHistoryLoading" :error="historyError" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { storeToRefs } from "pinia"
import Card from "@/shared/ui/Card.vue"
import Spinner from "@/shared/ui/Spinner.vue"
import AssetChangeBadge from "@/entities/asset/ui/AssetChangeBadge.vue"
import AssetPriceChart from "@/widgets/asset-chart/ui/AssetPriceChart.vue"
import { useAssetStore } from "@/entities/asset/model/assetStore"
import { formatCurrency } from "@/shared/lib/number"

const route = useRoute()
const id = computed(() => route.params.id as string)

const store = useAssetStore()
const { selected: asset, isLoading, isHistoryLoading, historyError } = storeToRefs(store)

const price = computed(() => (asset.value ? formatCurrency(asset.value.priceUsd, 6) : "-"))
const marketCap = computed(() => (asset.value ? formatCurrency(asset.value.marketCapUsd) : "-"))
const volume = computed(() => (asset.value ? formatCurrency(asset.value.volumeUsd24Hr) : "-"))

const load = () => {
  if (!id.value) return
  store.loadAsset(id.value)
  store.loadHistory(id.value)
}

onMounted(load)
watch(id, load)
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back {
  font-size: 13px;
  color: var(--text-muted);
}

.center {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.2fr);
  gap: 16px;
}

.summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.title {
  margin: 0 0 4px;
  font-size: 20px;
}

.symbol {
  margin-left: 6px;
  font-size: 14px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.rank {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.summary__right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.price {
  margin: 0;
  font-size: 20px;
}


.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.stats__item {
  padding: 9px 11px;
  border-radius: 12px;
  background: var(--bg-elevated);
}

.stats__label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stats__value {
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
