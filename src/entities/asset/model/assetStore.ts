import { defineStore } from "pinia"
import type { Asset } from "./types"
import { fetchAsset, fetchAssets, fetchAssetHistoryWeek, type AssetHistoryPointDto } from "@/shared/api/coincapApi"

type AssetState = {
  list: Asset[]
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
  selected: Asset | null
  history: AssetHistoryPointDto[]
  isHistoryLoading: boolean
  historyError: string | null
}

const mapAsset = (dto: any): Asset => ({
  id: dto.id,
  name: dto.name,
  symbol: dto.symbol,
  priceUsd: Number(dto.priceUsd),
  changePercent24Hr: Number(dto.changePercent24Hr ?? 0),
  marketCapUsd: Number(dto.marketCapUsd),
  volumeUsd24Hr: Number(dto.volumeUsd24Hr),
  rank: Number(dto.rank ?? 0)
})

export const useAssetStore = defineStore("assets", {
  state: (): AssetState => ({
    list: [],
    isLoading: false,
    error: null,
    lastUpdated: null,
    selected: null,
    history: [],
    isHistoryLoading: false,
    historyError: null
  }),
  getters: {
    sortedByRank: state => [...state.list].sort((a, b) => a.rank - b.rank)
  },
  actions: {
    async loadAssets() {
      if (this.isLoading) return
      this.isLoading = true
      this.error = null
      try {
        const data = await fetchAssets()
        this.list = data.map(mapAsset)
        this.lastUpdated = Date.now()
      } catch (e) {
        this.error = "Не удалось загрузить данные"
      } finally {
        this.isLoading = false
      }
    },
    async loadAsset(id: string) {
      this.selected = null
      try {
        const dto = await fetchAsset(id)
        this.selected = mapAsset(dto)
      } catch {
        this.selected = null
      }
    },
    async loadHistory(id: string) {
      this.history = []
      this.historyError = null
      this.isHistoryLoading = true
      try {
        this.history = await fetchAssetHistoryWeek(id)
      } catch {
        this.historyError = "Не удалось загрузить график"
      } finally {
        this.isHistoryLoading = false
      }
    }
  }
})
