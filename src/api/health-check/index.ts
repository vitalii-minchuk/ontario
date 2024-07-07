import { AxiosResponse } from 'axios'
import defHttp from '~/modules/axios'

enum Api {
  PING = '/api/Core/Ping'
}

export function ping(): Promise<AxiosResponse<string>> {
  return defHttp.get(Api.PING)
}
