import axios from 'axios'
import { ref } from 'vue'

const _token = 'vwVK5lRyDU-oAAaOovGCSl5vuQvRbzAM'

export const urlAPI = 'http://evgen9nc.beget.tech/api/todo'

export const token = ref(_token)

const http = axios.create({
  baseURL: urlAPI,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((request) => {
  if (token.value) {
    request.headers['Authorization'] = `Bearer ${token.value}`
  }
  return request
})

export { http }
