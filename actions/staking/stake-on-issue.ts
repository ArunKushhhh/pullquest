"use server";

import { stakeCoinsOnIssue } from "@/lib/economy/staking";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function stakeOnIssue(issueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const stake = await stakeCoinsOnIssue(user.id, issueId);

    return { success: true, data: stake };
}