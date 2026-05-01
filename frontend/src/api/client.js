import axios from 'axios'

const client = axios.create({
  // Utilise /api par defaut: en dev via proxy Vite, en prod via proxy Nginx.
  baseURL: import.meta.env.VITE_API_URL || '/api',
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
