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

      for (const key in filteredEvents) {
        filteredEvents[key] = filteredEvents[key].filter((el) => {
          return this.selectedCategoryIds.includes(el.categoryId)
        })
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
    formatEvents(events: IEvent[]): void {
      const dateEventsMap: Record<string, IEvent[]> = {}

      events.forEach((event) => {
        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)

        while (startDate <= endDate) {
          const dateKey = startDate.toISOString().split('T')[0]

          if (!dateEventsMap[dateKey]) {
            dateEventsMap[dateKey] = []
          }

          dateEventsMap[dateKey].push(event)

          startDate.setDate(startDate.getDate() + 1)
        }
      })
      this.formattedEvents = dateEventsMap
    },
    setSelectedCategoryIds(ids: string[]): void {
      this.selectedCategoryIds = ids
    },
    setEvents(events: IEvent[]): void {
      this.events = [...events]
    },
    loadCategoriesIds(): void {
      const ids = eventsCategories.map((el) => el.categoryId)

      this.setSelectedCategoryIds(ids)
    },
    async loadEvents(): Promise<void> {
      const { data } = await getAllEvents()

      this.setEvents(data)
      this.formatEvents(data)
    },

    async createEvent(input: ICreateNewEventInput) {
      await createNewEvent(input)
    },

    async loadData() {
      this.loadCategoriesIds()
      await this.loadEvents()
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
