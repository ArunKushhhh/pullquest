import { getUser } from "@/actions/auth/get-user"
import { signInWithGithub } from "@/actions/auth/sign-in"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const user = await getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            PullQuest
          </h1>
        </div>

        <Button size="lg" className="gap-2 text-base" onClick={signInWithGithub}>
          <Github />
          Get started with GitHub
        </Button>
      </div>
    </div>
  )
}
