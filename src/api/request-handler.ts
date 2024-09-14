import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
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
