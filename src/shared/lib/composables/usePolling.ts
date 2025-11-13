import { onBeforeUnmount, onMounted, ref } from "vue"

export const usePolling = (fn: () => Promise<void> | void, interval: number) => {
  const isActive = ref(false)
  let timer: number | null = null

  const stop = () => {
    isActive.value = false
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  const start = async () => {
    isActive.value = true
    await fn()
    timer = window.setInterval(() => {
      fn()
    }, interval)
  }

  onMounted(start)
  onBeforeUnmount(stop)

  return { start, stop, isActive }
}
