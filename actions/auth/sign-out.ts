"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { redirect } from "next/navigation"

export async function signOut() {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }

    redirect("/")
}
