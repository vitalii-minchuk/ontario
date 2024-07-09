import { toast } from 'vue3-toastify'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { createNewEvent, getAllEvents } from '~/api/calendar'
import { ICreateNewEventInput, IEvent } from '~/api/calendar/types'

interface EventsState {
  events: IEvent[]
  formattedEvents: Record<string, IEvent[]>
  selectedCategoryIds: string[]
}

export const useEventsStore = defineStore({
  id: 'events',

  state: (): EventsState => ({
    events: [],
    formattedEvents: {},
    selectedCategoryIds: []
  }),

  getters: {
    getEvents(): IEvent[] {
      return this.events
    },
    getSelectedCategoryIds(): string[] {
      return this.selectedCategoryIds
    },
    getFilteredFormattedEvents(): Record<string, IEvent[]> {
      const filteredEvents = { ...this.formattedEvents }

      if (this.selectedCategoryIds.length) {
        for (const key in filteredEvents) {
          filteredEvents[key] = filteredEvents[key].filter((el) => {
            return this.selectedCategoryIds.includes(el.categoryId)
          })
        }
      }

      return filteredEvents
    },
    getDayEventsByDate(): (date: string) => IEvent[] {
      return (date: string) => {
        console.log(date)
        return this.getFilteredFormattedEvents[date]
      }
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
    formatEvents(events: IEvent[]): void {
      const dateEventsMap = {}

      events.forEach((event) => {
        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)

        // Ensure startDate and endDate are valid dates
        if (isNaN(startDate) || isNaN(endDate)) {
          console.warn(`Invalid date for event: ${event.name}`)
          return
        }

        // Iterate over the date range from startDate to endDate
        while (startDate <= endDate) {
          const dateKey = startDate.toISOString().split('T')[0]

          if (!dateEventsMap[dateKey]) {
            dateEventsMap[dateKey] = []
          }

          dateEventsMap[dateKey].push(event)

          // Move to the next day
          startDate.setDate(startDate.getDate() + 1)
        }
      })
      this.formattedEvents = dateEventsMap
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
        this.setEvents(events.data)
        this.formatEvents(events.data)
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
