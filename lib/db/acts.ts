import { createSupabaseServerClient } from "../supabase/server-client";

async function getActiveAct() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("acts").select("*").eq("is_active", true).single();

    if (error) {
        throw new Error("Error getting act: " + error.message);
    }
    return data;
}

async function getActById(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("acts").select("*").eq("id", id).single();

    if (error) {
        throw new Error("Error getting act: " + error.message);
    }
    return data;
}

export { getActiveAct, getActById };