import axios, { AxiosInstance } from 'axios'

const defHttp: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_GLOB_API_AUTH_TOKEN}`
  }
})

export default defHttp
