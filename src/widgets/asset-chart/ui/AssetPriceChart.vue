<template>
  <Card>
    <div class="header">
      <div>
        <h2 class="title">Динамика за неделю</h2>
        <p class="subtitle">Цена в USD, шаг 2 часа</p>
      </div>
    </div>
    <div class="chart-wrapper">
      <Spinner v-if="isLoading" label="Строим график" />
      <p v-else-if="error" class="error">{{ error }}</p>
      <Line v-else :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js"
import Card from "@/shared/ui/Card.vue"
import Spinner from "@/shared/ui/Spinner.vue"
import { useAssetStore } from "@/entities/asset/model/assetStore"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler)

const props = defineProps<{
  isLoading: boolean
  error: string | null
}>()

const store = useAssetStore()

const chartData = computed(() => {
  const labels = store.history.map(point => {
    const date = new Date(point.time)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  })

  const dataset = store.history.map(point => Number(point.priceUsd))

  return {
    labels,
    datasets: [
      {
        data: dataset,
        fill: true,
        tension: 0.2,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        pointRadius: 0
      }
    ]
  }
})

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 8,
        color: "#9ca3af"
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: "#9ca3af"
      },
      grid: {
        color: "rgba(148,163,184,0.18)"
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  margin: 0;
  font-size: 16px;
}

.subtitle {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}

.chart-wrapper {
  position: relative;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error {
  font-size: 14px;
  color: var(--danger);
}
</style>
