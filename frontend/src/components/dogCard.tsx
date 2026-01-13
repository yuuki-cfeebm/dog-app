import { useFavorites } from "../context/FavoritesContext"

interface DogCardProps {
  id: string,
  url: string,
  breed: string
}


export default function DogCard({ id, url, breed }: DogCardProps) {

  const { removeFavoriteDog } = useFavorites()

  return(
    <div id={id} className="flex flex-col justify-between items-center gap-6 p-4 rounded-xl bg-gray-200 w-[300px] h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <img className="rounded-xl h-[250px] w-[250px] object-cover" src={url} alt={breed} />
        <div className="font-bold text-xl">
          <span>Raça: </span>
          <span >{breed}</span>
        </div>
      </div>
      <div className="">
        <button onClick={() => removeFavoriteDog(id)} className="bg-red-500 text-white p-2 rounded-md cursor-pointer">Remover</button>
      </div>
    </div>
  )
}