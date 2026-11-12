const BACKEND_URL = "http://localhost:3000"

export async function allDogs(): Promise<string[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/breeds/list/all`)
  const data = await res.json()
  const breeds = data.message as Record<string, string[]>

  return Object.entries(breeds).flatMap(([breed, subs]) =>
    subs.length ? subs.map(sub => `${sub} ${breed}`) : [breed]
  )
}

export async function getDogImage(breed: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/dog/${encodeURIComponent(breed.trim().toLowerCase())}`)
  if (!res.ok) throw new Error("Raça não encontrada")
  const data = await res.json()
  if (!data.image) throw new Error("Raça não encontrada")
  return data.image
}
