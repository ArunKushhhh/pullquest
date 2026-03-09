import { getUser } from "@/actions/auth/get-user";
import { signOut } from "@/actions/auth/sign-out";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    const metadata = user.user_metadata;

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
                <ThemeToggle />
                <form action={signOut}>
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    );
}