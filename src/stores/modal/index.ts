import { defineStore, acceptHMRUpdate } from 'pinia'

interface ModalsState {
  createEventModal: boolean
}

export const useModalsStore = defineStore({
  id: 'modals',

  state: (): ModalsState => ({
    createEventModal: false
  }),

  getters: {
    getCreateEventModal(): boolean {
      return this.createEventModal
    }
  },

  actions: {
    setModal(modal: keyof ModalsState, value: boolean) {
      this[modal] = value
    },
    showModal(modal: keyof ModalsState): void {
      this.setModal(modal, true)
    },
    hideModal(modal: keyof ModalsState): void {
      this.setModal(modal, false)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalsStore, import.meta.hot))
}
