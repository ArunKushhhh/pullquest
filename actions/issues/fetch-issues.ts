"use server";

import { getActiveIssues } from "@/lib/db/issues";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function fetchActiveIssues() {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const issues = await getActiveIssues();

    return { success: true, data: issues };
}