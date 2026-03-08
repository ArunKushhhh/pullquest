import { getSupabaseAdminClient } from "../supabase/admin-client";

type ActionResult = { success: true; } | { success: false; error: string; };

export async function resolvePR(prId: string, outcome: string, xp?: number): Promise<ActionResult> {
    try {
        const supabase = getSupabaseAdminClient();

        const { data, error } = await supabase.rpc("resolve_pull_request", { p_pr_id: prId, p_outcome: outcome, p_xp: xp });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}