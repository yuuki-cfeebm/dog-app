import { useEffect, useState } from "react"
import { allDogs, getDogImage } from "../api/dog"
import { FaHeart, FaRegHeart, FaRedo, FaDog } from "react-icons/fa"
import BreedAutocomplete from "./BreedAutocomplete"
import { useFavorites } from "../context/FavoritesContext"
import { capitalize } from "../utils/text"

export default function Input() {
  const [input, setInput] = useState("")
  const [breed, setBreed] = useState("")       // raça da imagem exibida
  const [img, setImg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [breeds, setBreeds] = useState<string[]>([])

  const { addFavoriteDog, removeFavoriteDog, favorites } = useFavorites()
  const favorite = favorites.find(fav => fav.img === img)

  useEffect(() => {
    allDogs().then(setBreeds).catch(() => setBreeds([]))
  }, [])

  async function load(target: string) {
    setLoading(true)
    setError(null)
    try {
      const url = await getDogImage(target)
      setImg(url)
      setBreed(target.trim().toLowerCase())
    } catch {
      setError(`Não encontramos a raça "${target}". Tente outra, como "akita" ou "golden retriever".`)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    load(input)
  }

  function toggleFavorite() {
    if (!img) return
    if (favorite) removeFavoriteDog(favorite.id)
    else addFavoriteDog(breed, img)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <BreedAutocomplete
          value={input}
          onChange={setInput}
          onSelect={load}
          options={breeds}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="cursor-pointer rounded-xl bg-brand-500 px-5 font-bold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buscar
        </button>
      </form>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-stone-100">
          {img ? (
            <img
              src={img}
              alt={`Foto de um ${breed}`}
              className={`h-full w-full object-contain transition-opacity ${loading ? "opacity-40" : ""}`}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-stone-400">
              <FaDog size={56} />
              <span>Busque uma raça para ver uma foto</span>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
            </div>
          )}
        </div>

        {img && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="text-lg font-bold">{capitalize(breed)}</span>
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 font-semibold transition ${
                  favorite
                    ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                    : "border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-red-500" />}
                {favorite ? "Favoritado" : "Favoritar"}
              </button>
              <button
                onClick={() => load(breed)}
                disabled={loading}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 font-semibold text-white transition hover:bg-stone-700 disabled:opacity-50"
              >
                <FaRedo size={12} /> Outra foto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
