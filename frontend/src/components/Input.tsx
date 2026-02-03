import { useEffect, useState } from "react";
import { sameBreed, allDogs, testando } from "../api/dog"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { toast } from "sonner";

export default function Input() {

  const [input, setInput] = useState("")
  const [img, setImg] = useState<string | null>(null)
  const [statusImg, setStatusImg] = useState(false)
  
  
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const url = await testando(input)
    if(url === " ")
      return
    setStatusImg(!statusImg)
    setImg(url.image)
  }

  async function handleSameBreed() {
    const url = await sameBreed(input)
    setImg(url)
  }

  const { addFavoriteDog, favorites } = useFavorites()
  let isFavorite = favorites.some(fav => fav.img === img)
  
  function salvar() {
    if(isFavorite)
      return toast.error("Imagem ja foi salva!")
    else {
      if(!img) return
      addFavoriteDog(input, img)
    }
  }

  useEffect(() => {
    allDogs()
  }, [])

  return(
    <div className="flex flex-col items-center w-full h-full gap-8">
      <form onSubmit={handleSearch} className="flex w-1/3">
        <input 
          type="text" 
          placeholder="ex: akita, pinscher..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 bg-gray-100 rounded-md border-2 border-transparent focus:outline-none focus:border-sky-500"
          />
      </form>
      <div className={`flex justify-center items-center rounded-2xl h-[600px] w-[800px] ${img ? "bg-none" : "bg-gray-300"}`}>
        {img ?
          (
          <div className="flex flex-col gap-6 h-full">
            <img src={img} alt="img-cachorro" className="h-full m-auto object-contain rounded-2xl shadow-lg"/>
            <div className="w-[600px] m-auto flex items-center justify-around">
              <button 
                onClick={salvar}
                className="cursor-pointer"
              >
                { isFavorite ? (<FaHeart color="red" size={30}/>) : (<FaRegHeart color="red" size={30}/>)}
              </button>
              <button 
                onClick={handleSameBreed}
                className="bg-yellow-500 hover:bg-yellow-600 transition-all text-white p-4 rounded-2xl cursor-pointer text-xl">
                Gerar novamente
              </button>
            </div>
          </div>  
          ) : (
            <span className="text-center text-gray-500 text-2xl">Imagem aparece aqui...</span>
          )}
      </div>
    </div>
      
  )
}