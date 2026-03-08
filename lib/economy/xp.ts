import { getSupabaseAdminClient } from "../supabase/admin-client";

type ActionResult = { success: true; } | { success: false, error: string; };

export async function applyXP(userId: string, xp: number): Promise<ActionResult> {
    try {
        const supabase = getSupabaseAdminClient();

        const { data, error } = await supabase.rpc("apply_xp", { p_user_id: userId, p_xp: xp });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}