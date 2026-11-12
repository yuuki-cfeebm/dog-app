import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"
import Header from "../components/Header"
import Main from "../components/Main"
import DogCard from "../components/dogCard"
import { useFavorites } from "../context/FavoritesContext"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <>
      <Header titulo="Seus favoritos" texto="As fotos que você favoritar ficam salvas aqui." />
      <Main>
        {favorites.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <FaRegHeart size={40} className="text-red-400" />
            <p className="text-stone-500">Você ainda não favoritou nenhuma foto.</p>
            <Link
              to="/"
              className="rounded-xl bg-brand-500 px-5 py-2 font-bold text-white transition hover:bg-brand-600"
            >
              Buscar cachorros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map(dog => (
              <DogCard key={dog.id} id={dog.id} breed={dog.breed} url={dog.img} />
            ))}
          </div>
        )}
      </Main>
    </>
  )
}
