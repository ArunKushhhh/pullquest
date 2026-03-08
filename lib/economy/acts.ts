import { getSupabaseAdminClient } from "../supabase/admin-client";

type ActionResult = { success: true; } | { success: false; error: string; };

export async function resetCurrentAct(): Promise<ActionResult> {
    try {
        const supabase = getSupabaseAdminClient();
        const { error } = await supabase.rpc("reset_act");

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}