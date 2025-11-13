import { defineStore } from "pinia"

export type Theme = "dark" | "light"

type UiState = {
  theme: Theme
  favorites: string[]
}

const storageKey = "crypto-dashboard-ui"

const loadState = (): UiState => {
  if (typeof window === "undefined") return { theme: "dark", favorites: [] }
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return { theme: "dark", favorites: [] }
    const parsed = JSON.parse(raw) as UiState
    return {
      theme: parsed.theme ?? "dark",
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : []
    }
  } catch {
    return { theme: "dark", favorites: [] }
  }
}

const saveState = (state: UiState) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(storageKey, JSON.stringify(state))
}

export const useUiStore = defineStore("ui", {
  state: () => loadState(),
  getters: {
    isFavorite: state => (id: string) => state.favorites.includes(id)
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark"
      saveState(this.$state)
    },
    toggleFavorite(id: string) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(x => x !== id)
      } else {
        this.favorites.push(id)
      }
      saveState(this.$state)
    }
  }
})
