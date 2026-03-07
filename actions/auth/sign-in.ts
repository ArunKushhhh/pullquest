"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInWithGithub() {
    const supabase = await createSupabaseServerClient();
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    if (data.url) {
        redirect(data.url);
    }
}
