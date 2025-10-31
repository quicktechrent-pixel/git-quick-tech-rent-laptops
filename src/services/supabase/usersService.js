import { supabase } from '../../supabase/client'

export const usersService = {
  getAll: async () => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return data
  },

  getByEmail: async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  create: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  login: async (email, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()
    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}