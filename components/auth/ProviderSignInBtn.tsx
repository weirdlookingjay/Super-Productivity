"use client";

import { useState } from "react";
import { Button } from "../ui/button"
import { useLocale } from "next-intl";
import useProviderLoginError from "@/hooks/useProviderLoginError";
import { signIn } from "next-auth/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    providerName: "google" | "github";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderSignBtn = ({ children, providerName, onLoading, ...props }: Props) => {
    const [showLoggedInInfo, setShowLoggedInInfo] = useState(false);
    const locale = useLocale()

    useProviderLoginError(showLoggedInInfo);

    const signInHandler = async () => {
        onLoading(true);
        setShowLoggedInInfo(true);
        try {
            await signIn(providerName, { callbackUrl: `/${locale}/onboarding` });
        } catch (error) {
            console.log(error)
        }
        onLoading(false);
    }

    return (
        <Button onClick={signInHandler} {...props} variant={"secondary"} type="button">
            {children}
        </Button>
    )
}

export default ProviderSignBtn