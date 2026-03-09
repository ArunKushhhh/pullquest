"use server";

import { resolvePR } from "@/lib/economy/pr-resolution";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const VALID_OUTCOMES = ["merged", "rejected", "multiple", "closed_without_merge", "unreviewed"] as const;

export async function resolveUserPR(prId: string, outcome: string, xp?: number) {
    const supabase = await createSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error("User not authenticated");
    }

    // Validate outcome
    if (!VALID_OUTCOMES.includes(outcome as typeof VALID_OUTCOMES[number])) {
        throw new Error(`Invalid outcome. Must be one of: ${VALID_OUTCOMES.join(", ")}`);
    }

    // Validate XP if provided
    if (xp !== undefined && (xp < 0 || !Number.isFinite(xp))) {
        throw new Error("XP must be a non-negative finite number");
    }

    const result = await resolvePR(prId, outcome, xp);

    return result;
}