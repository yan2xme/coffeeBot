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
