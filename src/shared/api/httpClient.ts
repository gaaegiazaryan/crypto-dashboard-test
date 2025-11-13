import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://api.coincap.io/v3"
const apiKey = import.meta.env.VITE_API_KEY

export const http = axios.create({
  baseURL,
  timeout: 12000
})

http.interceptors.request.use(config => {
  if (apiKey) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})
