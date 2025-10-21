import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(request => {
  console.log('API Request:', request.method.toUpperCase(), request.url)
  if (request.params) console.log('Params:', request.params)
  return request
})

export const propertyService = {
  getAll: (filters = {}) => {
    const params = {}

    if (filters.name && filters.name.trim()) {
      params.name = filters.name.trim()
    }
    if (filters.address && filters.address.trim()) {
      params.address = filters.address.trim()
    }
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      params.minPrice = filters.minPrice
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      params.maxPrice = filters.maxPrice
    }

    return api.get('/properties', { params })
  },
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`)
}

export const ownerService = {
  getAll: () => api.get('/owners'),
  getById: (id) => api.get(`/owners/${id}`),
  create: (data) => api.post('/owners', data),
  update: (id, data) => api.put(`/owners/${id}`, data),
  delete: (id) => api.delete(`/owners/${id}`)
}

export const propertyImageService = {
  getByPropertyId: (propertyId) => api.get(`/propertyimages/property/${propertyId}`),
  create: (data) => api.post('/propertyimages', data),
  delete: (id) => api.delete(`/propertyimages/${id}`)
}

export const propertyTraceService = {
  getAll: () => api.get('/propertytraces'),
  getById: (id) => api.get(`/propertytraces/${id}`),
  getByPropertyId: (propertyId) => api.get(`/propertytraces/property/${propertyId}`),
  create: (data) => api.post('/propertytraces', data),
  update: (id, data) => api.put(`/propertytraces/${id}`, data),
  delete: (id) => api.delete(`/propertytraces/${id}`)
}

export default api

