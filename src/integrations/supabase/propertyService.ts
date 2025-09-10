import { supabase } from './client'
import { TablesInsert, Tables } from './types'

export type Property = Tables<'properties'>
export type PropertyInsert = TablesInsert<'properties'>

export class PropertyService {
  // Create a new property listing
  static async createProperty(propertyData: PropertyInsert): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single()

      if (error) {
        console.error('Error creating property:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error creating property:', error)
      return null
    }
  }

  // Get all active properties
  static async getActiveProperties(limit = 20): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching properties:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching properties:', error)
      return []
    }
  }

  // Get properties by user
  static async getUserProperties(userId: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user properties:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user properties:', error)
      return []
    }
  }

  // Get property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching property:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching property:', error)
      return null
    }
  }

  // Update property
  static async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating property:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating property:', error)
      return null
    }
  }

  // Delete property
  static async deleteProperty(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting property:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting property:', error)
      return false
    }
  }

  // Search properties
  static async searchProperties(filters: {
    city?: string
    propertyType?: string
    listingType?: 'sell' | 'rent'
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
  }): Promise<Property[]> {
    try {
      let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')

      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }

      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType)
      }

      if (filters.listingType) {
        query = query.eq('listing_type', filters.listingType)
      }

      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }

      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }

      if (filters.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching properties:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error searching properties:', error)
      return []
    }
  }

  // Increment property views
  static async incrementViews(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ views: supabase.rpc('increment', { row_id: id, column_name: 'views' }) })
        .eq('id', id)

      if (error) {
        console.error('Error incrementing views:', error)
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }
}
