"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Check, Trash, User } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { UserAvatar } from "../user-avatar";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { imageSchema, ImageSchema } from "@/schema/imageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

interface Props {
    profileImage?: string | null;
}

export const AddUserImage = ({ profileImage }: Props) => {
    const [imagePreview, setImagePreview] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ImageSchema>({
        resolver: zodResolver(imageSchema),
    });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const result = imageSchema.safeParse({ image: selectedFile });
            if (result.success) {
                form.clearErrors("image");
                form.setValue("image", selectedFile);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
            } else {
                const errors = result.error.flatten().fieldErrors.image;
                errors?.forEach((error) => {
                    form.setError("image", { message: error });
                });
            }
        }
    };

    const imageOptions = useMemo(() => {
        if (!imagePreview && profileImage) {
            return {
                canDelete: true,
                canSave: false,
            };
        } else if (imagePreview && profileImage) {
            return {
                canDelete: false,
                canSave: true,
            };
        } else if (imagePreview && !profileImage) {
            return {
                canDelete: false,
                canSave: true,
            };
        } else {
            return {
                canDelete: false,
                canSave: false,
            };
        }
    }, [imagePreview, profileImage]);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            <p className="text-sm text-muted-foreground">
                Add a photo to your profile
            </p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="relative bg-muted w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center items-center text-muted-foreground">
                        {profileImage ? (
                            <Image
                                priority
                                src={profileImage}
                                alt=""
                                fill
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <User />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center justify-center sm:max-w-[28rem] p-0">
                    <DialogHeader className="items-center justify-center">
                        <DialogTitle>Upload a photo</DialogTitle>
                    </DialogHeader>
                    {imagePreview ? (
                        <div className="rounded-full w-52 h-52 relative overflow-hidden my-5">
                            <Image
                                src={imagePreview}
                                alt=""
                                fill
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ) : (
                        <UserAvatar
                            className="w-52 h-52 my-5"
                            size={52}
                            profileImage={profileImage}
                        />
                    )}
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    type="button"
                                                    className="dark:text-white mb-1"
                                                    onClick={() => {
                                                        inputRef?.current?.click();
                                                    }}
                                                >
                                                    Choose a file
                                                </Button>
                                                <Input
                                                    {...field}
                                                    ref={inputRef}
                                                    value={undefined}
                                                    type="file"
                                                    id="image/"
                                                    onChange={onImageChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="flex mt-5 w-full justify-center items-center gap-4">
                                <Button
                                    type="button"
                                    disabled={!imageOptions.canDelete}
                                    variant={imageOptions.canDelete ? "default" : "secondary"}
                                    className={`rounded-full w-12 h-12 p-2 ${imageOptions.canDelete ? "text-white" : "text-muted-foreground"}`}
                                >
                                    <Trash size={18} />
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!imageOptions.canSave}
                                    variant={imageOptions.canSave ? "default" : "secondary"}
                                    className={`rounded-full w-12 h-12 p-2 ${imageOptions.canSave ? "text-white" : "text-muted-foreground"}`}
                                >
                                    <Check size={18} />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
