"use server";

import { createIssue } from "@/lib/db/issues";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { DIFFICULTY_CAPS } from "@/lib/xp/tiers";

const VALID_DIFFICULTIES = Object.keys(DIFFICULTY_CAPS);

export async function registerIssue(data: { githubIssueId: string, repositoryId: string, difficulty: string, stakeAmount: number; }) {
    const supabase = await createSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error("User not authenticated");
    }

    // Validate difficulty
    if (!VALID_DIFFICULTIES.includes(data.difficulty)) {
        throw new Error(`Invalid difficulty. Must be one of: ${VALID_DIFFICULTIES.join(", ")}`);
    }

    // Validate stake amount (must be positive integer within difficulty cap)
    const cap = DIFFICULTY_CAPS[data.difficulty];
    if (!Number.isInteger(data.stakeAmount) || data.stakeAmount <= 0) {
        throw new Error("Stake amount must be a positive integer");
    }
    if (data.stakeAmount > cap) {
        throw new Error(`Stake amount exceeds cap of ${cap} for ${data.difficulty} difficulty`);
    }

    // Authorize: verify user is a member of the repository's organization
    const { data: repo } = await supabase
        .from("repositories")
        .select("org_id")
        .eq("id", data.repositoryId)
        .single();

    if (!repo) {
        throw new Error("Repository not found");
    }

    const { data: membership } = await supabase
        .from("organization_members")
        .select("id")
        .eq("org_id", repo.org_id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (!membership) {
        throw new Error("You must be a member of the repository's organization to register issues");
    }

    const issue = await createIssue({
        github_issue_id: data.githubIssueId,
        repository_id: data.repositoryId,
        difficulty: data.difficulty,
        stake_amount: data.stakeAmount,
    });

    return { success: true, data: issue };
}