import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()
  const href = userId ? '/dashboard' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[780px] text-center">
        <h1 className="text-6xl mb-4">🐨</h1>
        <h1 className="text-6xl">Check Resume</h1>
        <Link href={href}>
          <button className="mt-8 bg-white text-black px-4 py-2 rounded-md">Get Started</button>
        </Link>
      </div>
    </div>
  )
}
