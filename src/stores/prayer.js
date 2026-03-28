import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import mrg32k3a from 'mrg32k3a'

const STORAGE_KEYS = {
  maleNames: 'za-kogo-male',
  femaleNames: 'za-kogo-female',
  currentPrayer: 'za-kogo-current'
}

export const usePrayerStore = defineStore('prayer', () => {
  const maleNames = ref(localStorage.getItem(STORAGE_KEYS.maleNames) ?? '')
  const femaleNames = ref(localStorage.getItem(STORAGE_KEYS.femaleNames) ?? '')
  const currentPrayer = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.currentPrayer) ?? 'null')
  )

  // Persist to localStorage on every change
  watch(maleNames, (val) => localStorage.setItem(STORAGE_KEYS.maleNames, val))
  watch(femaleNames, (val) => localStorage.setItem(STORAGE_KEYS.femaleNames, val))
  watch(
    currentPrayer,
    (val) => localStorage.setItem(STORAGE_KEYS.currentPrayer, JSON.stringify(val)),
    { deep: true }
  )

  /**
   * Parse a textarea value into an array of trimmed, non-empty names.
   */
  function parseNames(text) {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }

  /**
   * Randomly pick one person and store it as the current prayer target.
   */
  function startPrayer() {
    const males = parseNames(maleNames.value).map((name) => ({ name, gender: 'M' }))
    const females = parseNames(femaleNames.value).map((name) => ({ name, gender: 'K' }))
    const all = [...males, ...females]

    if (all.length === 0) return

    const picked = all[Math.floor(mrg32k3a() * all.length)]
    currentPrayer.value = picked
  }

  /**
   * Finish the current prayer session, returning the name that was prayed for.
   */
  function finishPrayer() {
    const person = currentPrayer.value
    currentPrayer.value = null
    return person
  }

  return {
    maleNames,
    femaleNames,
    currentPrayer,
    startPrayer,
    finishPrayer
  }
})
