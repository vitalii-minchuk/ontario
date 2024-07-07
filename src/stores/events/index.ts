import { toast } from 'vue3-toastify'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { createNewEvent, getAllEvents } from '~/api/calendar'
import { ICreateNewEventInput, IEvent } from '~/api/calendar/types'

interface EventsState {
  events: IEvent[]
  selectedCategoryIds: string[]
}

export const useEventsStore = defineStore({
  id: 'events',

  state: (): EventsState => ({
    events: [],
    selectedCategoryIds: []
  }),

  getters: {
    // eventse(): (id: number) => string {
    //   return (id: number) => {
    //     const type = this.projectTypes.find((t) => t.id === id)
    //     return type ? type?.name : ''
    //   }
    // },
    getEvents(): IEvent[] {
      return this.events
    },
    getSelectedCategoryIds(): string[] {
      return this.selectedCategoryIds
    },
    getFilteredEvents(): IEvent[] {
      let filteredEvents = [...this.getEvents]

      if (this.selectedCategoryIds.length) {
        filteredEvents = filteredEvents.filter((el) => {
          return this.selectedCategoryIds.includes(el.categoryId)
        })
      }

      return filteredEvents
    }
  },

  actions: {
    showLoader(): void {
      const { showLoader } = useLoaderStore()

      showLoader()
    },
    hideLoader(): void {
      const { hideLoader } = useLoaderStore()

      hideLoader()
    },
    setSelectedCategoriesIds(ids: string[]): void {
      this.selectedCategoryIds = ids
    },
    setEvents(events: IEvent[]): void {
      this.events = [...events]
    },
    loadCategoriesIds(): void {
      const ids = eventsCategories.map((el) => el.categoryId)

      this.setSelectedCategoriesIds(ids)
    },
    async loadEvents(): Promise<void> {
      this.showLoader()
      try {
        const events = await getAllEvents()
        console.log(events.data)
        this.setEvents(events.data)
      } catch (error) {
        toast.error('Something went wrong', { theme: 'auto' })
      } finally {
        this.hideLoader()
      }
    },

    async createEvent(input: ICreateNewEventInput) {
      this.showLoader()
      try {
        await createNewEvent(input)
        await this.loadEvents()
        toast.success('Success', { theme: 'auto' })
      } catch (error) {
        toast.error('Something went wrong', { theme: 'auto' })
      } finally {
        this.hideLoader()
      }
    },

    // updateRoute(): void {
    //   const query: Recordable = {}

    //   if (this.selectedTab) query.tab = this.getCurrentTabData?.alias
    //   else query.tab = this.getCurrentTabData?.type

    //   if (this.searchTechnology) query.search = this.searchTechnology

    //   this.router.replace({
    //     query
    //   })
    // },
    loadData() {
      this.loadCategoriesIds()
      this.loadEvents()
    },
    resetState(): void {
      this.selectedCategoryIds = []
      this.events = []
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot))
}
