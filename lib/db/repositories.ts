import { createSupabaseServerClient } from "../supabase/server-client";

async function getRepoById(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("repositories").select("*").eq("id", id).single();

    if (error) {
        throw new Error("Error getting repository: " + error.message);
    }
    return data;
}

async function getRepoByGithubId(githubRepoId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("repositories").select("*").eq("github_repo_id", githubRepoId).single();

    if (error) {
        throw new Error("Error getting repository: " + error.message);
    }
    return data;
}

async function getReposByOrgId(orgId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("repositories").select("*").eq("org_id", orgId);

    if (error) {
        throw new Error("Error getting repositories: " + error.message);
    }
    return data;
}

export { getRepoById, getRepoByGithubId, getReposByOrgId };