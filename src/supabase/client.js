import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Subscribe to device changes
export const subscribeToDevices = (callback) => {
  return supabase
    .channel('devices-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'devices' }, 
      callback
    )
    .subscribe()
}