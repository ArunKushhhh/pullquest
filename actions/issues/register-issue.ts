"use server";

import { createIssue } from "@/lib/db/issues";
import { getRepoById } from "@/lib/db/repositories";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const ALLOWED_DIFFICULTIES = ["easy", "medium", "hard"] as const;
const MIN_STAKE_AMOUNT = 1;
const MAX_STAKE_AMOUNT = 10000;

export async function registerIssue(data: { githubIssueId: string, repositoryId: string, difficulty: string, stakeAmount: number; }) {
    if (!data.githubIssueId || !data.repositoryId) {
        throw new Error("GitHub issue ID and repository ID are required");
    }

    if (!(ALLOWED_DIFFICULTIES as readonly string[]).includes(data.difficulty)) {
        throw new Error(`Invalid difficulty. Must be one of: ${ALLOWED_DIFFICULTIES.join(", ")}`);
    }

    if (
        typeof data.stakeAmount !== "number" ||
        !Number.isFinite(data.stakeAmount) ||
        data.stakeAmount < MIN_STAKE_AMOUNT ||
        data.stakeAmount > MAX_STAKE_AMOUNT
    ) {
        throw new Error(`Invalid stake amount. Must be a number between ${MIN_STAKE_AMOUNT} and ${MAX_STAKE_AMOUNT}`);
    }

    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    let repository;
    try {
        repository = await getRepoById(data.repositoryId);
    } catch {
        throw new Error("Repository not found");
    }

    const { data: membership, error: membershipError } = await supabase
        .from("organization_members")
        .select("role")
        .eq("org_id", repository.org_id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (membershipError) {
        throw new Error("Error checking organization membership: " + membershipError.message);
    }

    if (!membership) {
        throw new Error("Not authorized: you must be a member of the organization that owns this repository");
    }

    const issue = await createIssue({ github_issue_id: data.githubIssueId, repository_id: data.repositoryId, difficulty: data.difficulty, stake_amount: data.stakeAmount });

    return { success: true, data: issue };
}