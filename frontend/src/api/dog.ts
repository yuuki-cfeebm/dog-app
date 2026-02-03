import { SiAxios } from "react-icons/si"

export async function getBreed(input: string) {
  const breed = input
  const res = await fetch(`${import.meta.env.VITE_API_URL}/breed/${breed}/images/random`)
  const data = await res.json()
    return data.message
}

export async function sameBreed(input: string) {
  const breed = input
  const res = await fetch(`${import.meta.env.VITE_API_URL}/breed/${breed}/images/random`)
  const data = await res.json()
    return data.message
}

export async function allDogs() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/breeds/list/all`)
  const data = await res.json()
    return data.message
}

export async function testando(input: string) {
  const res = await fetch(`http://localhost:3000/dog/${input}`)
  const data = await res.json()
    return data
}