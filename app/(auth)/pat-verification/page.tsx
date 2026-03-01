import { getUser } from "@/actions/auth/get-user"
import { redirect } from "next/navigation"
import PatForm from "./_components/pat-form"

export default async function PatVerificationPage() {
    const user = await getUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="flex w-full max-w-md flex-col gap-8 px-4">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Connect Private Repositories
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Optionally provide a GitHub fine-grained personal access
                        token to enable access to your private or organization
                        repositories.
                    </p>
                </div>

                <PatForm />
            </div>
        </div>
    )
}
