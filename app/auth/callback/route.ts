import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/pat-verification"

    if (code) {
        const supabase = await createSupabaseServerClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(new URL(next, origin))
        }
    }

    return NextResponse.redirect(new URL("/login?error=auth_failed", origin))
}
