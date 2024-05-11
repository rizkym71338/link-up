import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      signUpUrl="/sign-up"
      appearance={{ baseTheme: dark }}
    />
  )
}
