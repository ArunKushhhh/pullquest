import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const publicRoutes = ["/", "/login"]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow public routes, auth callback, API routes, and static assets
    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthCallback = pathname.startsWith("/auth/callback")
    const isApiRoute = pathname.startsWith("/api/")

    if (isPublicRoute || isAuthCallback || isApiRoute) {
        return NextResponse.next()
    }

    // For protected routes, verify the session
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // Cookie setting may fail in proxy context — this is expected
                    // The session will still be refreshed on the next server component render
                }
            },
        },
    })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}