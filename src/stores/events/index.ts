import { defineStore, acceptHMRUpdate } from 'pinia'
import { IEvent } from '~/api/calendar/types'

interface EventsState {
  events: IEvent[]
}

export const useEventsStore = defineStore({
  id: 'events',

  state: (): EventsState => ({
    events: []
  }),

  getters: {
    getProjectTypeNameById(): (id: number) => string {
      return (id: number) => {
        const type = this.projectTypes.find((t) => t.id === id)
        return type ? type?.name : ''
      }
    },
    getFilteredPresentations(): ParserPresentationModel[] {
      let filteredPresentations = this.getAllPresentations

      if (this.getSelectedDirectionId) {
        filteredPresentations = filteredPresentations.filter((p) => {
          return p.directionId === this.getSelectedDirectionId
        })
      }
      if (this.getSelectedLanguageId) {
        filteredPresentations = filteredPresentations.filter((p) => {
          return p.languageId === this.getSelectedLanguageId
        })
      }
      if (this.getSearch)
        filteredPresentations = filteredPresentations.filter((p) => p.name.match(this.getSearch))

      return filteredPresentations
    },
    items: (state): Array<{ name: string; amount: number }> =>
      state.rawItems.reduce(
        (items, item) => {
          const existingItem = items.find((it) => it.name === item)

          if (!existingItem) {
            items.push({ name: item, amount: 1 })
          } else {
            existingItem.amount++
          }

          return items
        },
        [] as Array<{ name: string; amount: number }>
      )
  },

  actions: {
    async login(user: string, password: string) {
      const userData = await apiLogin(user, password)

      this.$patch({
        name: user,
        ...userData
      })
    },

    updateRoute(): void {
      const query: Recordable = {}

      if (this.selectedTab) query.tab = this.getCurrentTabData?.alias
      else query.tab = this.getCurrentTabData?.type

      if (this.searchTechnology) query.search = this.searchTechnology

      this.router.replace({
        query
      })
    },
    loadData() {
      this.loadTechnologiesList()
      this.loadSkillsList()
      this.loadWishesList()
    },
    resetState(): void {
      this.projectTypes = []
      this.isProjectTypeNew = true
      this.isProjectTypesTableShown = false
      this.isProjectTypesDialogShown = false
      this.editedProjectType = Object.assign({}, defaultProjectType)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot))
}
