import { supabase } from '../../supabase/client'

export const devicesService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  create: async (deviceData) => {
    const { data, error } = await supabase
      .from('devices')
      .insert([deviceData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  update: async (id, deviceData) => {
    const { data, error } = await supabase
      .from('devices')
      .update(deviceData)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}