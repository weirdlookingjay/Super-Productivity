import { useTranslations } from "next-intl";
import ProviderSignBtn from "./ProviderSignInBtn";

export const ProviderSignBtns = ({ signInCard }: { signInCard?: boolean; }) => {
    const t = useTranslations("AUTH");
    return (
        <div className="flex flex-col gap-2">
            <ProviderSignBtn className="w-full rounded-[1.9rem] border">
                {signInCard
                    ? t("SIGN_IN.PROVIDERS.GOOGLE")
                    : t("SIGN_UP.PROVIDERS.GOOGLE")}
            </ProviderSignBtn>
            <ProviderSignBtn className="w-full rounded-[1.9rem] border">
                {signInCard
                    ? t("SIGN_IN.PROVIDERS.GITHUB")
                    : t("SIGN_UP.PROVIDERS.GITHUB")}
            </ProviderSignBtn>
        </div>
    );
};
