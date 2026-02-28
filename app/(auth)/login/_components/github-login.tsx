"use client"

import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react";

type GithubLoginProps = {
    user: User | null;
}

export default function GithubLogin({ user }: GithubLoginProps) {
    const supabase = getSupabaseBrowserClient()
    const [currentUser, setCurrentUser] = useState<User | null>(user)

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ?? null)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [supabase])

    async function handleGithubLogin() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}`,
                skipBrowserRedirect: false
            }
        })

        if (error) {
            console.error("GitHub login failed:", error);
        }
    }

    return <div>
        <Button onClick={handleGithubLogin}>Login with GitHub</Button>
    </div>;
}