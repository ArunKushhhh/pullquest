import { getUser } from "@/actions/auth/get-user"
import { signInWithGithub } from "@/actions/auth/sign-in"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { redirect } from "next/navigation"

export default async function LoginPage() {
    const user = await getUser()

    if (user) {
        redirect("/dashboard")
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Sign in to PullQuest
                    </h1>
                </div>

                <form action={signInWithGithub}>
                    <Button size="lg" type="submit" className="gap-2">
                        <Github />
                        Login with GitHub
                    </Button>
                </form>
            </div>
        </div>
    )
}