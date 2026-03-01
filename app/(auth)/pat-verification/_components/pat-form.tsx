"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { verifyAndSavePat } from "@/actions/auth/verify-pat"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function PatForm() {
    const [token, setToken] = useState("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleVerify() {
        if (!token.trim()) {
            toast.error("Please enter a personal access token")
            return
        }

        startTransition(async () => {
            try {
                const result = await verifyAndSavePat(token)
                if (result.success) {
                    toast.success("Token verified successfully")
                    router.push("/dashboard")
                } else {
                    toast.error(result.error ?? "Invalid Personal Access Token")
                }
            } catch {
                toast.error("Something went wrong. Please try again.")
            }
        })
    }

    function handleSkip() {
        router.push("/dashboard")
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="pat-token"
                    className="text-sm font-medium text-foreground"
                >
                    Personal Access Token
                </label>
                <Input
                    id="pat-token"
                    type="password"
                    placeholder="github_pat_..."
                    value={token}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                    disabled={isPending}
                />
                <p className="text-xs text-muted-foreground">
                    Generate a fine-grained token from{" "}
                    <a
                        href="https://github.com/settings/tokens?type=beta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                    >
                        GitHub Settings
                    </a>
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    onClick={handleVerify}
                    disabled={isPending || !token.trim()}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify Token"
                    )}
                </Button>
                <Button
                    variant="ghost"
                    onClick={handleSkip}
                    disabled={isPending}
                >
                    Skip for now
                </Button>
            </div>
        </div>
    )
}

