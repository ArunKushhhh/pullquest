"use server";

import { getUserById } from "@/lib/db/users";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function getUserProfile() {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const profile = await getUserById(user.id);

    return { success: true, data: profile };
}