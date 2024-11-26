import { User } from "lucide-react";
import Image from "next/image";

interface Props {
    size?: number;
    className?: string;
    profileImage?: string | null
}

export const UserAvatar = ({ className, profileImage, size = 16 }: Props) => {
    return (
        <div className={`bg-muted rounded-full flex justify-center items-center relative overflow-hidden ${className}`}>
            {profileImage ? (
                <Image
                    src={profileImage}
                    alt="Profile Avatar"
                    fill
                    className="object-cover"
                    priority
                />
            ) : <User size={size} />}
        </div>
    )
}