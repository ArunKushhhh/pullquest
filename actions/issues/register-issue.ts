"use server";

import { createIssue } from "@/lib/db/issues";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function registerIssue(data: { githubIssueId: string, repositoryId: string, difficulty: string, stakeAmount: number; }) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const issue = await createIssue({ github_issue_id: data.githubIssueId, repository_id: data.repositoryId, difficulty: data.difficulty, stake_amount: data.stakeAmount });

    return { success: true, data: issue };
}