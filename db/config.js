import supabase from './client.js';

export async function getConfig(prompt) {
    try {
        const {data,error} = await supabase
        .from('config')
        .select()
        .limit(1)
        .single()

        if (error) throw error

        return data
        
    } catch (error) {
        console.log(error)
    }
} 
