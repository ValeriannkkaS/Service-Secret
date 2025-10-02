async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || response.statusText)
  }

  return response.json() as Promise<T>
}

export const fetchApi = {
  get: <T>(url: string) => http<T>(url),
  post: <T>(url: string, body: any) => http<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(url: string) => http<T>(url, { method: 'DELETE' }),
}
