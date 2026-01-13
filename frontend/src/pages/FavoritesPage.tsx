import Header from "../components/Header";
import Main from "../components/Main";
import { useFavorites } from "../context/FavoritesContext";
import DogCard from "../components/dogCard";

export default function FavoritesPage() {

  const { favorites } = useFavorites()

  return(
    <div>
      <Header titulo="Favoritos" texto="Imagens marcadas como favorito ficam aqui."/>
      <Main>
        <div className="flex-1 flex justify-center max-w-7xl min-h-screen gap-4 flex-wrap p-4">
          {favorites.map(dog => (
            <DogCard id={dog.id} breed={dog.breed} url={dog.img} />
          ))}
        </div>
      </Main>
    </div>
  )
}