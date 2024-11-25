"use client";

import { useForm } from "react-hook-form"
import { CardContent } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { signInSchema, SignInSchema } from "@/schema/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProviderSignBtns } from "./ProviderSignBtns"
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../loadingState";

export const SignInCardContent = () => {
    const t = useTranslations("AUTH");

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
    const m = useTranslations("MESSAGES");

    const onSubmit = async (data: SignInSchema) => {
        setIsLoading(true);

        try {
            const account = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });
            if (!account) throw new Error("Something went wrong");

            if (account.error) {
                toast({
                    title: m(account.error),
                    variant: "destructive"
                });
            } else {
                toast({
                    title: m("SUCCESS.SIGNED_IN")
                });
                router.push("/onboarding");
                router.refresh();
            }
        } catch (error) {
            let errMsg = m(`ERRORS.DEFAULT`)
            if (typeof error === "string") {
                errMsg = error
            } else if (error instanceof Error) {
                errMsg = m(error.message)
            }
            toast({
                title: errMsg,
                variant: "destructive"
            });
        }
        setIsLoading(false);
    }

    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
                    <ProviderSignBtns signInCard onLoading={setIsLoading} />
                    <div className="space-y-1.5">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={t("EMAIL")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder={t("PASSWORD")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    </div>
                    <div className="space-y-2">
                        <Button className="w-full bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50  rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base" type="submit">
                            {isLoading ? (
                                <LoadingState loadingText={m("PENDING.LOADING")} />
                            ) : (
                                t("SIGN_IN.SUBMIT_BTN")
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                        {t("SIGN_IN.TERMS.FIRST")}
                        <Link href="/" className="font-bold underline">
                            {t("SIGN_IN.TERMS.SECOND")}
                        </Link>
                    </p>
                </form>
            </Form>
        </CardContent>
    )
}