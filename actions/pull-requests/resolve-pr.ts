"use server";

import { resolvePR } from "@/lib/economy/pr-resolution";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function resolveUserPR(prId: string, outcome: string, xp?: number) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const resolution = await resolvePR(prId, outcome, xp);

    return { success: true, data: resolution };
}