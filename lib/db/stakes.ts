import { createSupabaseServerClient } from "../supabase/server-client";

async function getStakesByUserId(userId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: stakes, error } = await supabase.from("stakes").select("*, issues(*)").eq("user_id", userId);

    if (error) {
        throw new Error("Error getting stakes: " + error.message);
    }
    return stakes;
}

async function getStakesByIssueId(issueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: stakes, error } = await supabase.from("stakes").select("*, users(username, avatar_url)").eq("issue_id", issueId);

    if (error) {
        throw new Error("Error getting stakes: " + error.message);
    }
    return stakes;
}

async function getUserStakeOnIssue(userId: string, issueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: stake, error } = await supabase.from("stakes").select().eq("user_id", userId).eq("issue_id", issueId).maybeSingle();

    if (error) {
        throw new Error("Error getting stake: " + error.message);
    }
    return stake;
}

export { getStakesByUserId, getStakesByIssueId, getUserStakeOnIssue };