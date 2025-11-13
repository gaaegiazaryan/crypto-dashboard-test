export const formatCurrency = (value: number, fractionDigits = 2) => {
  if (!Number.isFinite(value)) return "-"
  if (value > 999_999_999) {
    const short = value / 1_000_000_000
    return `$${short.toFixed(1)}B`
  }
  if (value > 999_999) {
    const short = value / 1_000_000
    return `$${short.toFixed(1)}M`
  }
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractionDigits
  })
}

export const formatNumber = (value: number, fractionDigits = 2) => {
  if (!Number.isFinite(value)) return "-"
  return value.toLocaleString("en-US", {
    maximumFractionDigits: fractionDigits
  })
}
