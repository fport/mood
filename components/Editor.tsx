'use client'

export default function Editor({entry}: {entry: any}) {
  console.log("osman",entry.content)
  return (
    <div>
      {entry.content}
    </div>
  )
}