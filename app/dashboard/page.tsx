import { getUser } from "@/actions/auth/get-user"
import { signOut } from "@/actions/auth/sign-out"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const user = await getUser()

    if (!user) {
        redirect("/login")
    }

    const metadata = user.user_metadata

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-3">
                    {metadata?.avatar_url && (
                        <img
                            src={metadata.avatar_url as string}
                            alt={metadata.user_name as string}
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    )}
                    <h1 className="text-2xl font-bold text-foreground">
                        {metadata?.user_name ?? "User"}
                    </h1>
                </div>

                <form action={signOut}>
                    <Button variant="outline" type="submit">
                        Sign out
                    </Button>
                </form>
            </div>
        </div>
    )
}