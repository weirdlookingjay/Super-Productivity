import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import {
    additionalUserInfoFirstPart,
    AdditionalUserInfoFirstPart,
} from "@/schema/additionalUserInfoFirstPart";
import { ActionType } from "@/types/onBoardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddUserImage } from "../AddUserImage";
import { useEffect } from "react";

interface Props {
    profileImage?: string | null;
}

export const FirstStep = ({ profileImage }: Props) => {
    const { currentStep, name, surname, dispatch } = useOnboardingForm();

    const form = useForm<AdditionalUserInfoFirstPart>({
        resolver: zodResolver(additionalUserInfoFirstPart),
        defaultValues: {
            name: name ? name : "",
            surname: surname ? surname : "",
        },
    });

    useEffect(() => {
        dispatch({
            type: ActionType.PROFILEIMAGE,
            payload: profileImage as string | null | undefined,
        })
    }, [profileImage, dispatch])

    const onSubmit = (data: AdditionalUserInfoFirstPart) => {
        dispatch({ type: ActionType.NAME, payload: data.name! });
        dispatch({ type: ActionType.SURNAME, payload: data.surname! });
        dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
    };

    return (
        <div className="max-w-md w-full space-y-8">
            <AddUserImage profileImage={profileImage} />
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-1.8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} className="bg-muted" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem className="text-muted-foreground">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last name" {...field} className="bg-muted" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        className="w-full max-w-md dark:text-white font-semibold"
                    >
                        Continue
                        <ArrowRight width={18} height={18} />
                    </Button>
                </form>
            </Form>
        </div>
    );
};
