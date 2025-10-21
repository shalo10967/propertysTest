import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: { use: vi.fn() }
      }
    }))
  }
}))

describe('API Services', () => {
  let mockApi

  beforeEach(() => {
    vi.clearAllMocks()
    mockApi = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: { use: vi.fn() }
      }
    }
    axios.create.mockReturnValue(mockApi)
  })

  describe('propertyService', () => {
    it('getAll fetches properties', async () => {
      const mockProperties = [{ idProperty: '1', name: 'Test Property' }]
      mockApi.get.mockResolvedValue({ data: mockProperties })

      const { propertyService } = await import('./api')
      await propertyService.getAll()

      expect(mockApi.get).toHaveBeenCalledWith('/properties', { params: {} })
    })

    it('getAll with filters sends correct params', async () => {
      mockApi.get.mockResolvedValue({ data: [] })

      const { propertyService } = await import('./api')
      await propertyService.getAll({
        name: 'Test',
        address: 'Street',
        minPrice: 100000,
        maxPrice: 500000
      })

      expect(mockApi.get).toHaveBeenCalledWith('/properties', {
        params: {
          name: 'Test',
          address: 'Street',
          minPrice: 100000,
          maxPrice: 500000
        }
      })
    })

    it('create sends POST request', async () => {
      mockApi.post.mockResolvedValue({ data: { idProperty: '1' } })

      const { propertyService } = await import('./api')
      const newProperty = {
        name: 'New Property',
        address: '123 St',
        price: 300000,
        year: 2023
      }

      await propertyService.create(newProperty)
      expect(mockApi.post).toHaveBeenCalledWith('/properties', newProperty)
    })

    it('update sends PUT request', async () => {
      mockApi.put.mockResolvedValue({ data: {} })

      const { propertyService } = await import('./api')
      const updatedProperty = { name: 'Updated Property' }
      await propertyService.update('1', updatedProperty)
      expect(mockApi.put).toHaveBeenCalledWith('/properties/1', updatedProperty)
    })

    it('delete sends DELETE request', async () => {
      mockApi.delete.mockResolvedValue({ data: {} })

      const { propertyService } = await import('./api')
      await propertyService.delete('1')
      expect(mockApi.delete).toHaveBeenCalledWith('/properties/1')
    })
  })

  describe('ownerService', () => {
    it('getAll fetches all owners', async () => {
      const mockOwners = [{ idOwner: '1', name: 'John Doe' }]
      mockApi.get.mockResolvedValue({ data: mockOwners })

      const { ownerService } = await import('./api')
      await ownerService.getAll()
      expect(mockApi.get).toHaveBeenCalledWith('/owners')
    })

    it('getById fetches specific owner', async () => {
      const mockOwner = { idOwner: '1', name: 'John Doe' }
      mockApi.get.mockResolvedValue({ data: mockOwner })

      const { ownerService } = await import('./api')
      await ownerService.getById('1')
      expect(mockApi.get).toHaveBeenCalledWith('/owners/1')
    })
  })

  describe('propertyImageService', () => {
    it('getByPropertyId fetches images for property', async () => {
      const mockImages = [{ file: 'image.jpg', enabled: true }]
      mockApi.get.mockResolvedValue({ data: mockImages })

      const { propertyImageService } = await import('./api')
      await propertyImageService.getByPropertyId('1')
      expect(mockApi.get).toHaveBeenCalledWith('/propertyimages/property/1')
    })
  })

  describe('propertyTraceService', () => {
    it('getAll fetches all traces', async () => {
      const mockTraces = [{ idPropertyTrace: '1', name: 'Sale' }]
      mockApi.get.mockResolvedValue({ data: mockTraces })

      const { propertyTraceService } = await import('./api')
      await propertyTraceService.getAll()
      expect(mockApi.get).toHaveBeenCalledWith('/propertytraces')
    })

    it('getByPropertyId fetches traces for property', async () => {
      mockApi.get.mockResolvedValue({ data: [] })

      const { propertyTraceService } = await import('./api')
      await propertyTraceService.getByPropertyId('1')
      expect(mockApi.get).toHaveBeenCalledWith('/propertytraces/property/1')
    })
  })
})

