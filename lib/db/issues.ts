import type { TablesInsert } from "@/types/db";
import { getSupabaseAdminClient } from "../supabase/admin-client";
import { createSupabaseServerClient } from "../supabase/server-client";

async function getActiveIssues() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("issues").select("*, repositories(name, org_id, organizations(name))").eq("is_active", true);

    if (error) {
        throw new Error("Error getting active issues: " + error.message);
    }
    return data;
}

async function getIssueById(id: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("issues").select("*, repositories(name, org_id)").eq("id", id).single();

    if (error) {
        throw new Error("Error getting issue: " + error.message);
    }
    return data;
}

async function getIssueByGithubId(githubIssueId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("issues").select("*").eq("github_issue_id", githubIssueId).single();

    if (error) {
        throw new Error("Error getting issue by github id: " + error.message);
    }
    return data;
}

async function createIssue(data: TablesInsert<"issues">) {
    const supabase = getSupabaseAdminClient();

    const { data: createdIssue, error } = await supabase.from("issues").insert(data).select().single();

    if (error) {
        throw new Error("Error creating issue: " + error.message);
    }
    return createdIssue;
}

export { getActiveIssues, getIssueById, getIssueByGithubId, createIssue };