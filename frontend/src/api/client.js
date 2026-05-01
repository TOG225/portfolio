import axios from 'axios'

const isDev = import.meta.env.DEV
const configuredApi = import.meta.env.VITE_API_URL
const baseURL = isDev ? (configuredApi || '/api') : '/api'

const client = axios.create({
  // En production, forcer /api pour passer par le proxy Nginx (meme origine, pas de CORS).
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data)
    } else {
      console.error('API unreachable:', error.message)
    }
    return Promise.reject(error)
  },
)

export default client
