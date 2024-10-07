import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { LocalStorageKey } from './enums'

const getAccountTokenInLocalStorage = (): string | null => {
  return localStorage.getItem(LocalStorageKey.ACCOUNT_TOKEN)
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
    const accountToken = getAccountTokenInLocalStorage()

    if (accountToken) {
      config.headers.Authorization = accountToken
    }

    return config
  },
  (error) => {}
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {}
)

export default async function <T>(args: AxiosRequestConfig): Promise<T> {
  const { data } = await instance(args)
  return data
}
