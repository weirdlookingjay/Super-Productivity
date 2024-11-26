import { checkIfUserCompletedOnboarding } from "@/app/lib/checkIfUserCompletedOnboarding"
import { AdditionalInfoSection } from "@/components/onboarding/AdditionalInfoSection";
import { SummarySection } from "@/components/onboarding/SummarySection";
import { OnboardingFormProvider } from "@/context/OnboardingForm";


const OnboardingPage = async () => {
    const session = await checkIfUserCompletedOnboarding("/onboarding");
    return (
        <OnboardingFormProvider session={session}>
            <AdditionalInfoSection />
            <SummarySection />
        </OnboardingFormProvider>
    )
}

export default OnboardingPage