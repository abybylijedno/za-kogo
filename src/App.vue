<template>
  <div class="za-kogo-wrapper">
    <div class="pure-g za-kogo-container">

      <!-- Header -->
      <div class="pure-u-1">
        <h1 class="za-kogo-title">Za kogo?</h1>
      </div>

      <!-- ── PRAYER SCREEN ── -->
      <template v-if="store.currentPrayer">
        <div class="pure-u-1 za-kogo-prayer-screen">
          <p class="za-kogo-prayer-text">
            Modlisz się za
            <span :class="store.currentPrayer.gender === 'K' ? 'za-kogo-female' : 'za-kogo-male'">
              {{ store.currentPrayer.gender === 'K' ? 'kobietę' : 'mężczyznę' }}
            </span>
          </p>
          <button class="pure-button za-kogo-done-btn" @click="onFinish">
            Kliknij tutaj, gdy skończysz się modlić
          </button>
        </div>
      </template>

      <!-- ── MAIN SCREEN ── -->
      <template v-else>
        <!-- Female names -->
        <div class="pure-u-1 pure-u-md-1-2">
          <div class="za-kogo-section">
            <label class="za-kogo-label" for="femaleNames">
              <span class="za-kogo-label-dot za-kogo-label-dot--female"></span>
              Kobiety
            </label>
            <textarea
              v-model="store.femaleNames"
              id="femaleNames"
              class="pure-input-1 za-kogo-textarea"
              placeholder="Wpisz jedną osobę per linię"
              rows="10"
            ></textarea>
          </div>
        </div>

        <!-- Male names -->
        <div class="pure-u-1 pure-u-md-1-2">
          <div class="za-kogo-section">
            <label class="za-kogo-label" for="maleNames">
              <span class="za-kogo-label-dot za-kogo-label-dot--male"></span>
              Mężczyźni
            </label>
            <textarea
              v-model="store.maleNames"
              id="maleNames"
              class="pure-input-1 za-kogo-textarea"
              placeholder="Wpisz jedną osobę per linię~"
              rows="10"
            ></textarea>
          </div>
        </div>

        <!-- Action button -->
        <div class="pure-u-1 za-kogo-btn-row">
          <button
            class="pure-button pure-button-primary za-kogo-pray-btn"
            :disabled="!hasNames"
            @click="store.startPrayer()"
          >
            Módl się
          </button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePrayerStore } from './stores/prayer.js'

const store = usePrayerStore()

const hasNames = computed(() => {
  const hasMale = store.maleNames.trim().split('\n').some((l) => l.trim().length > 0)
  const hasFemale = store.femaleNames.trim().split('\n').some((l) => l.trim().length > 0)
  return hasMale || hasFemale
})

function onFinish() {
  const person = store.finishPrayer()
  if (person) {
    window.alert(`Modliłeś się za ${person.name}`)
  }
}
</script>

<style>
/* ── Reset / base ── */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f9f9f9;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ── Layout ── */
.za-kogo-wrapper {
  min-height: 100dvh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
}

.za-kogo-container {
  width: 100%;
  max-width: 860px;
}

/* ── Title ── */
.za-kogo-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 1.5rem 0 1rem;
  color: #222;
}

/* ── Section (textarea card) ── */
.za-kogo-section {
  padding: 0.5rem 0.75rem 1rem;
}

.za-kogo-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
}

.za-kogo-label-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.za-kogo-label-dot--female { background: #f472b6; }
.za-kogo-label-dot--male   { background: #60a5fa; }

.za-kogo-textarea {
  resize: vertical;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  background: #fff;
  width: 100%;
}
.za-kogo-textarea:focus {
  outline: 2px solid #6366f1;
  outline-offset: 1px;
  border-color: transparent;
}

/* ── Pray button row ── */
.za-kogo-btn-row {
  display: flex;
  justify-content: center;
  padding: 1.25rem 0 1.5rem;
}

.za-kogo-pray-btn {
  font-size: 1.1rem;
  padding: 0.65em 2.5em;
  background: #6366f1;
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.za-kogo-pray-btn:hover:not(:disabled) {
  background: #4f46e5;
}
.za-kogo-pray-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Prayer screen ── */
.za-kogo-prayer-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 60dvh;
  text-align: center;
  padding: 2rem 1rem;
}

.za-kogo-prayer-text {
  font-size: clamp(1.4rem, 5vw, 2.25rem);
  font-weight: 600;
  color: #222;
  margin: 0;
  line-height: 1.4;
}

/* Gender underlines */
.za-kogo-female {
  text-decoration: underline;
  text-decoration-color: #f472b6;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}
.za-kogo-male {
  text-decoration: underline;
  text-decoration-color: #60a5fa;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}

/* ── Done button ── */
.za-kogo-done-btn {
  font-size: 1rem;
  padding: 0.7em 1.8em;
  background: #22c55e;
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  white-space: normal;
  max-width: 400px;
  line-height: 1.4;
}
.za-kogo-done-btn:hover {
  background: #16a34a;
}
</style>
