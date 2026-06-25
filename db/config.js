const supabase = import ('./client')


async function getConfig() {
    const {data,error} = await supabase
        .from('config')
        .select('1')
        .eq('id', 1)
        .single()

        if (error) throw error
        return data
}

export default { getConfig };