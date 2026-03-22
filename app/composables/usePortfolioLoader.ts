import type { LoadingStage } from '~/types/stack'

export const usePortfolioLoader = () => {
  const stages: LoadingStage[] = [
    { text: 'INITIALIZING',    threshold: 0   },
    { text: 'LOADING ASSETS',  threshold: 25  },
    { text: 'RENDERING SCENE', threshold: 60  },
    { text: 'COMPLETE',        threshold: 100 },
  ]

  const TOTAL_BLOCKS   = 30
  const TICK_INTERVAL  = 400
  const COMPLETE_DELAY = 600
  const SKIP_DELAY     = 2000
  const SESSION_KEY    = 'portfolio_loader_seen'

  const buildProgressBar = (progress: number): string => {
    const filled = Math.floor((progress / 100) * TOTAL_BLOCKS)
    return Array.from({ length: TOTAL_BLOCKS }, (_, i) =>
      i < filled ? '█' : '░'
    ).join('')
  }

  const getStageText = (progress: number): string => {
    const stage = [...stages].reverse().find(s => progress >= s.threshold)
    return stage?.text ?? 'INITIALIZING'
  }

  const hasSeenLoader = (): boolean => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  }

  const markLoaderSeen = (): void => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(SESSION_KEY, 'true')
  }

  // Tracks real asset loading progress
  const getRealProgress = (): Promise<void> => {
    return new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve()
        return
      }
      window.addEventListener('load', () => resolve(), { once: true })
    })
  }

  return {
    stages,
    TICK_INTERVAL,
    COMPLETE_DELAY,
    SKIP_DELAY,
    buildProgressBar,
    getStageText,
    hasSeenLoader,
    markLoaderSeen,
    getRealProgress,
  }
}