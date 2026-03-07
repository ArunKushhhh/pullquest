import { createSupabaseServerClient } from "../supabase/server-client";

async function getPRsByUserId(userId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("pull_requests").select("*, issues(*)").eq("user_id", userId);

    if (error) {
        throw new Error("Error getting pull requests: " + error.message);
    }
    return data;
}

async function getPRByGithubId(githubId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("pull_requests").select("*").eq("github_pr_id", githubId).single();

    if (error) {
        throw new Error("Error getting pull requests: " + error.message);
    }
    return data;
}

async function getPRsByIssueId(issueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("pull_requests").select("*").eq("issue_id", issueId);

    if (error) {
        throw new Error("Error getting pull requests: " + error.message);
    }
    return data;
}

export { getPRByGithubId, getPRsByUserId, getPRsByIssueId };