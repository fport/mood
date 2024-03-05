import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="flex w-screen h-screen items-center justify-center bg-black">
    <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
  </div>
}