import { AuthCard } from "@/components/auth/AuthCard"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up",
}

const SignUp = () => {
  return (
    <AuthCard />
  )
}

export default SignUp