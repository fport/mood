import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="flex w-screen h-screen items-center justify-center bg-black">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/new-user"
      afterSignUpUrl="/new-user"
    />
  </div>
}