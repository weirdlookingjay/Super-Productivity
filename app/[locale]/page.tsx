"use client";

import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"



const Home = () => {


    const sessionn = useSession();
    const logputHandler = () => {
        signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
        })
    }

    return (
        <>
            <Button onClick={logputHandler}>LOGOUT</Button>
            <ThemeSwitcher />
        </>)
}

export default Home