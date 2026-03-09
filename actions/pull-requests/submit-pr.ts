"use server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin-client";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function submitPR(data: { githubPrId: string, issueId: string; }) {
    const supabase = await createSupabaseServerClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    // Validate: issue must exist and be active
    const { data: issue } = await supabase
        .from("issues")
        .select("id, is_active")
        .eq("id", data.issueId)
        .single();

    if (!issue) {
        throw new Error("Issue not found");
    }

    if (!issue.is_active) {
        throw new Error("Issue is no longer active");
    }

    // Validate: user must have a locked stake on this issue
    const { data: stake } = await supabase
        .from("stakes")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("issue_id", data.issueId)
        .eq("status", "locked")
        .maybeSingle();

    if (!stake) {
        throw new Error("You must stake coins on this issue before submitting a PR");
    }

    const adminClient = getSupabaseAdminClient();
    const { data: pr, error } = await adminClient
        .from("pull_requests")
        .insert({
            github_pr_id: data.githubPrId,
            issue_id: data.issueId,
            user_id: user.id,
            outcome: "unreviewed",
        })
        .select()
        .single();

    if (error) {
        throw new Error("Error submitting PR: " + error.message);
    }

    return { success: true, data: pr };
}