import { getSupabaseAdminClient } from "../supabase/admin-client";

type ActionResult = { success: true; } | { success: false; error: string; };

export async function stakeCoinsOnIssue(userId: string, issueId: string): Promise<ActionResult> {
    try {
        const supabase = getSupabaseAdminClient();

        const { data, error } = await supabase.rpc("stake_coins", { p_user_id: userId, p_issue_id: issueId });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}