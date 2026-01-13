import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

export interface Dog {
  id: string
  breed: string
  img: string
}

interface FavoriteDogType {
  favorites: Dog[]
  addFavoriteDog: (breed: string, img: string) => void
  removeFavoriteDog: (id: string) => void
}

const FavoritesContext = createContext<FavoriteDogType | undefined>(undefined)

export function FavoritesProvider({ children }: {children: ReactNode}) {
  const [favorites, setFavorites] = useState<Dog[]>(() => {
    const saved = localStorage.getItem("favorites")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  function addFavoriteDog(breed: string, img: string) {
    const newDog: Dog = {
      id: crypto.randomUUID(),
      breed,
      img
    }
    setFavorites(prev => [...prev, newDog])
    toast.success("Imagem salvada com sucesso!")

  }

  function removeFavoriteDog(id: string) {
    setFavorites(prev => prev.filter(dog => dog.id !== id))
    console.log("removeu", favorites)
    toast.success("Imagem Removida com sucesso")
  }

  return(
    <FavoritesContext.Provider value={{ favorites, addFavoriteDog, removeFavoriteDog}}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if(!context) throw new Error("useFavorites deve ser usado dentro do FavoritesProvider")
  
  return context
}