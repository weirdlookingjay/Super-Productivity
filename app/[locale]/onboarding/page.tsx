import { checkIfUserCompletedOnboarding } from "@/app/lib/checkIfUserCompletedOnboarding"


const OnboardingPage = async () => {
    const session = await checkIfUserCompletedOnboarding("/onboarding");
    console.log(session)
    return (
        <div>page</div>
    )
}

export default OnboardingPage