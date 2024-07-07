import { AxiosResponse } from 'axios'
import defHttp from '~/modules/axios'
import { ICreateNewEventInput, IEvent } from './types'

enum Api {
  ALL = '/api/Event/All',
  CREATE = '/api/Event/Create'
}

export function getAllEvents(): Promise<AxiosResponse<IEvent[]>> {
  return defHttp.get(Api.ALL)
}

export function createNewEvent(input: ICreateNewEventInput): Promise<AxiosResponse<IEvent>> {
  return defHttp.post(Api.CREATE, input)
}
