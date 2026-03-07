"use server";

import { encryptPat } from "@/lib/pat-crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

type VerifyPatResult =
    | { success: true; }
    | { success: false; error: string; };

export async function verifyAndSavePat(token: string): Promise<VerifyPatResult> {
    if (!token || !token.trim()) {
        return { success: false, error: "Token is required" };
    }

    // Verify the token by making a request to GitHub API
    try {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });

        if (!response.ok) {
            return { success: false, error: "Invalid Personal Access Token" };
        }

        const githubUser = await response.json();

        // Verify the token belongs to the currently authenticated user
        const supabase = await createSupabaseServerClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "You must be signed in" };
        }

        const userGithubId = user.user_metadata?.provider_id ?? user.user_metadata?.sub;
        if (String(githubUser.id) !== String(userGithubId)) {
            return {
                success: false,
                error: "This token does not belong to your GitHub account",
            };
        }

        // Encrypt the PAT server-side before storing in user metadata
        const encryptedPat = encryptPat(token);
        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                github_pat: encryptedPat,
                github_pat_verified: true,
            },
        });

        if (updateError) {
            return { success: false, error: "Failed to save token. Please try again." };
        }

        return { success: true };
    } catch {
        return { success: false, error: "Failed to verify token. Please try again." };
    }
}
