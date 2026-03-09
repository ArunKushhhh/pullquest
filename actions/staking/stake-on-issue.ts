"use server";

import { stakeCoinsOnIssue } from "@/lib/economy/staking";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function stakeOnIssue(issueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        throw new Error("User not authenticated");
    }

    const result = await stakeCoinsOnIssue(user.id, issueId);

    return result;
}