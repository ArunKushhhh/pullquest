import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import GithubLogin from "./_components/github-login";

export default async function LoginPage() {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    return <GithubLogin user={user} />;
}