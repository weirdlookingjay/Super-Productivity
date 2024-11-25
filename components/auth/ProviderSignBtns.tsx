import { useTranslations } from "next-intl";
import ProviderSignBtn from "./ProviderSignInBtn";
import { GoogleLogo } from "../svg/GoogleLogo";
import { GithubLogo } from "../svg/GithubLogo";

export const ProviderSignBtns = ({
    signInCard,
    disabled,
    onLoading,
}: {
    signInCard?: boolean;
    disabled?: boolean;
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const t = useTranslations("AUTH");
    return (
        <div className="flex flex-col gap-2">
            <ProviderSignBtn
                disabled={disabled}
                onLoading={onLoading}
                providerName="google"
                className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
            >
                <GoogleLogo className="mr-2" width={20} height={20} />
                {signInCard
                    ? t("SIGN_IN.PROVIDERS.GOOGLE")
                    : t("SIGN_UP.PROVIDERS.GOOGLE")}
            </ProviderSignBtn>
            <ProviderSignBtn
                disabled={disabled}
                onLoading={onLoading}
                providerName="github"
                className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
            >
                <GithubLogo className="mr-2 fill-foreground" width={20} height={20} />
                {signInCard
                    ? t("SIGN_IN.PROVIDERS.GITHUB")
                    : t("SIGN_UP.PROVIDERS.GITHUB")}
            </ProviderSignBtn>
        </div>
    );
};
