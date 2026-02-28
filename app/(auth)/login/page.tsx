import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import GithubLogin from "./_components/github-login";

export default async function LoginPage() {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user)

    return <GithubLogin user={user} />;
}