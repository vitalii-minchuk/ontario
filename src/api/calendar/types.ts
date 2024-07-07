export interface IEvent {
  name: string
  startDate: Date | string
  endDate: Date | string
  categoryId: string
  category: null
  id: string
  createdOn: Date | string
  createdBy: null
  createdById: string
  modifiedOn: Date | string
  modifiedBy: null
  modifiedById: string
  isDeleted: boolean
}

export interface ICreateNewEventInput {
  name: string
  startDate: string
  endDate: string
  categoryId: string
}
