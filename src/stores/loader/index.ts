import { defineStore, acceptHMRUpdate } from 'pinia'

interface LoaderState {
  isLoading: boolean
}

export const useLoaderStore = defineStore({
  id: 'loader',

  state: (): LoaderState => ({
    isLoading: false
  }),

  getters: {
    getIsLoading(): boolean {
      return this.isLoading
    }
  },

  actions: {
    setIsLoading(value: boolean): void {
      this.isLoading = value
    },
    showLoader(): void {
      this.setIsLoading(true)
    },
    hideLoader(): void {
      this.setIsLoading(false)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoaderStore, import.meta.hot))
}
