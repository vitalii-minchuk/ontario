import { defineStore, acceptHMRUpdate } from 'pinia'
import { CSSProperties } from 'vue'
import { createNewEvent, getAllEvents } from '~/api/calendar'
import { ICreateNewEventInput, IEvent } from '~/api/calendar/types'

type TEventStyle = Record<'holiday' | 'studying' | 'conference', CSSProperties>

interface IEventsState {
  events: IEvent[]
  formattedEvents: Record<string, IEvent[]>
  selectedCategoryIds: string[]
  eventStyles: TEventStyle
}

export const useEventsStore = defineStore({
  id: 'events',

  state: (): IEventsState => ({
    events: [],
    formattedEvents: {},
    selectedCategoryIds: [],
    eventStyles: {
      holiday: DEFAULT_EVENT_STYLE,
      conference: DEFAULT_EVENT_STYLE,
      studying: DEFAULT_EVENT_STYLE
    }
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
        return this.getFilteredFormattedEvents[date]
      }
    },
    getEventStyleByCategory(): (category?: keyof TEventStyle | null) => CSSProperties {
      return (category?: keyof TEventStyle | null) => {
        return category ? this.eventStyles[category] : DEFAULT_EVENT_STYLE
      }
    }
  },

  actions: {
    formatEvents(events: IEvent[]): void {
      const dateEventsMap: Record<string, IEvent[]> = {}

      events.forEach((event) => {
        event.category = categoryNameByCategoryIdMapper[event.categoryId]
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
      console.log(dateEventsMap)
      this.formattedEvents = dateEventsMap
    },
    setSelectedCategoryIds(ids: string[]): void {
      this.selectedCategoryIds = ids
    },
    setEvents(events: IEvent[]): void {
      this.events = [...events]
    },
    setEventStyle(event: keyof TEventStyle, payload: CSSProperties): void {
      this.eventStyles[event] = payload
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
      let key: keyof TEventStyle
      for (key in this.eventStyles) {
        this.setEventStyle(key, DEFAULT_EVENT_STYLE)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot))
}
