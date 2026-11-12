import { FaTrash } from "react-icons/fa"
import { useFavorites } from "../context/FavoritesContext"
import { capitalize } from "../utils/text"

interface DogCardProps {
  id: string,
  url: string,
  breed: string
}

export default function DogCard({ id, url, breed }: DogCardProps) {
  const { removeFavoriteDog } = useFavorites()

  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-stone-100">
        <img
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          src={url}
          alt={breed}
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <span className="truncate font-bold">{capitalize(breed)}</span>
        <button
          onClick={() => removeFavoriteDog(id)}
          aria-label={`Remover ${breed} dos favoritos`}
          title="Remover"
          className="cursor-pointer rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}
