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
    return {
      error: true,
      code: res.status,
      messageForUI: 'Failed to create new entry',
    }
  }

  const data = await res.json()
  return data.data
}

export async function updateEntry(id: string, content: any) {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (!res.ok) {
    return {
      error: true,
      code: res.status,
      messageForUI: 'Failed to update entry',
    }
  }

  const data = await res.json()
  return data.data
}