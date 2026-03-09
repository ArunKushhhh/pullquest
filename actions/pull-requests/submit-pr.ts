"use server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin-client";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function submitPR(data: { githubPrId: string, issueId: string; }) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const adminClient = getSupabaseAdminClient();
    const { data: pr, error } = await adminClient.from("pull_requests").insert({ github_pr_id: data.githubPrId, issue_id: data.issueId, user_id: user.id, outcome: "unreviewed" }).select().single();

    if (error) {
        throw new Error("Error submitting PR: " + error.message);
    }

    return { success: true, data: pr };
}