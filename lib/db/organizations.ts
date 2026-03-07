import { createSupabaseServerClient } from "../supabase/server-client";

async function getOrgById(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("organizations").select("*").eq("id", id).single();

    if (error) {
        throw new Error("Error getting organization: " + error.message);
    }
    return data;
}

async function getOrgByGithubId(githubId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("organizations").select("*").eq("github_id", githubId).single();

    if (error) {
        throw new Error("Error getting organization: " + error.message);
    }
    return data;
}

async function getOrgMembers(orgId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("organization_members").select("*, users(username, avatar_url)").eq("org_id", orgId);

    if (error) {
        throw new Error("Error getting organization members: " + error.message);
    }
    return data;
}

async function getOrgRepos(orgId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("repositories").select("*").eq("github_org_id", orgId);

    if (error) {
        throw new Error("Error getting organization repos: " + error.message);
    }
    return data;
}

export { getOrgById, getOrgByGithubId, getOrgMembers, getOrgRepos };