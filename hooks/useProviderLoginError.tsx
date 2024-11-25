import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useTranslations } from "next-intl";


const useProviderLoginError = (showLoggedInInfo: boolean) => {
    const params = useSearchParams();
    const session = useSession();
    const { toast } = useToast();
    const m = useTranslations("MESSAGES");
    const router = useRouter();

    useEffect(() => {
        const error = params.get("error");
        if (error && session.status === "unauthenticated") {
            switch (error) {
                case "OAuthAccountNotLinked":
                    toast({
                        title: m("ERRORS.TAKEN_EMAIL"),
                        variant: "destructive",
                    });
                    break;
                case "OAuthCreatedAccount":
                    toast({
                        title: m("ERRORS.TAKEN_USERNAME"),
                        variant: "destructive",
                    });
                    break;
                case "Callback":
                    toast({
                        title: m("ERRORS.DEFAULT"),
                        variant: "destructive",
                    });
                    break;
                default:
                    toast({
                        title: m("ERRORS.DEFAULT"),
                        variant: "destructive",
                    });
            }
            const timer = setTimeout(() => {
                router.replace("/sign-in");
            }, 2000)

            return () => {
                clearTimeout(timer);
            }
        }
        if (session.status === "authenticated" && showLoggedInInfo) {
            toast({
                title: m("SUCCESS.SIGNED_IN"),
            })
        }

    }, [params, toast, session.status, router, showLoggedInInfo, m])

    return (
        <div>useProviderLoginError</div>
    )
}

export default useProviderLoginError