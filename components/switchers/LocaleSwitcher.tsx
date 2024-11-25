"use client";

import { startTransition, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LoadingState } from "../loadingState";
import { useLocale } from "next-intl";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next-intl/client";

export const LocaleSwitcher = () => {
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function onSelectChange(nextLocale: "en" | "sp") {
        setIsLoading(true);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={isLoading} variant="outline" size="icon">
                    {isLoading ? <LoadingState className="mr-2" /> : locale.toUpperCase()}
                    <span className="sr-only">Change Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => {
                        onSelectChange("sp");
                    }}
                    className="cursor-pointer"
                >
                    SP
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        onSelectChange("en");
                    }}
                    className="cursor-pointer"
                >
                    EN
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
