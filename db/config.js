import supabase from './client.js';

export async function getConfig() {
        const { data,error } = await supabase
        .from('config')
        .select()
        .limit(1)
        .single()

        if (error) throw error
        
        return data
        
} 

export async function updateConfig(stat) {
        const { data,error } = await supabase
        .from('config')
        .update({accepting_orders: stat})
        .eq('id', 1)

        if (error) throw error
        
        return data
        
} 

