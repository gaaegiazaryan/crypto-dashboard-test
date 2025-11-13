import { http } from "./httpClient"

export type AssetDto = {
  id: string
  rank: string | null
  symbol: string
  name: string
  supply: string
  maxSupply: string | null
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string | null
}

export type AssetHistoryPointDto = {
  priceUsd: string
  time: number
  date: string
}

export const fetchAssets = async (): Promise<AssetDto[]> => {
  const res = await http.get<{ timestamp: number; data: AssetDto[] }>("/assets", {
    params: { limit: 100 }
  })
  return res.data.data
}

export const fetchAsset = async (slug: string): Promise<AssetDto> => {
  const res = await http.get<{ timestamp: number; data: AssetDto }>(`/assets/${slug}`)
  return res.data.data
}

export const fetchAssetHistoryWeek = async (slug: string): Promise<AssetHistoryPointDto[]> => {
  const now = Date.now()
  const weekMs = 7 * 24 * 60 * 60 * 1000
  const start = now - weekMs

  const res = await http.get<{ timestamp: number; data: AssetHistoryPointDto[] }>(`/assets/${slug}/history`, {
    params: {
      interval: "h2",
      start,
      end: now
    }
  })

  return res.data.data
}
