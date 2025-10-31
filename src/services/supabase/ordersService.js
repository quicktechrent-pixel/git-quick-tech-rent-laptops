import { supabase } from '../../supabase/client'

export const ordersService = {
  create: async (orderData) => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: orderData.user_id,
        total: orderData.total,
        status: 'pending',
        delivery_address: orderData.delivery_address,
        delivery_date: orderData.delivery_date,
        return_date: orderData.return_date
      }])
      .select()
      .single();
    
    if (orderError) throw orderError;

    // Create order items
    if (orderData.items && orderData.items.length > 0) {
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        device_id: item.device_id,
        rental_duration: item.rental_duration,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    return order;
  },

  getByUserId: async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          devices (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          devices (*)
        ),
        users (name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  update: async (id, orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .update(orderData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};