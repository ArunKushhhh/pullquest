"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server-client"

export async function getUser() {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        return null
    }

    return user
}
