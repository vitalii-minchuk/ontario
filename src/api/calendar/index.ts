import { AxiosResponse } from 'axios'
import defHttp from '~/modules/axios'
import { IEvent } from './types'

enum Api {
  ALL = '/api/Event/All',
  CREATE = '/api/Event/Create'
}

export function getAllEvents(): Promise<AxiosResponse<IEvent[]>> {
  return defHttp.get(Api.ALL)
}
