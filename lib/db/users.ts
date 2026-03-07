import { getSupabaseAdminClient } from "../supabase/admin-client";
import { createSupabaseServerClient } from "../supabase/server-client";

async function getUserById(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

    if (error) {
        throw new Error("Error getting user: " + error.message);
    }

    return data;
}

async function getUserByGithubId(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("users").select("*").eq("github_id", id).single();

    if (error) {
        throw new Error("Error getting user: " + error.message);
    }

    return data;
}

async function updateUserProfileId(id: string, data: { username?: string; avatar_url?: string; }) {
    const supabase = getSupabaseAdminClient();

    const { data: updatedUser, error } = await supabase.from("users").update(data).eq("id", id).select().single();

    if (error) {
        throw new Error("Error updating user: " + error.message);
    }

    return updatedUser;
}

export { getUserById, getUserByGithubId, updateUserProfileId };