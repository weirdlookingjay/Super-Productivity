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

export const SignInCardContent = () => {
    const t = useTranslations("AUTH");

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SignInSchema) => {
        console.log(data);
    }

    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
                    <ProviderSignBtns signInCard />
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
                        <Button className="w-full font-bold text-white" type="submit">
                            {t("SIGN_IN.SUBMIT_BTN")}
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