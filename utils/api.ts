function createURL(path: string) {
  return window.location.origin + path
}

export async function createNewEntry() {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST'
      // body: JSON.stringify({}),
    })
  )

  if (!res.ok) {
    throw new Error('Failed to create new entry')
  }

  const data = await res.json()
  return data.data
}