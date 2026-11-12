import { FaHeart, FaSearch } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"

interface HeaderProps {
  titulo: string,
  texto: string
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-brand-100 text-brand-700"
      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
  }`

export default function Header({ titulo, texto }: HeaderProps) {
  const { favorites } = useFavorites()

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
            <span className="text-2xl">🐶</span>
            Dog App
          </Link>
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={navClass}>
              <FaSearch /> <span className="hidden sm:inline">Buscar</span>
            </NavLink>
            <NavLink to="/favoritos" className={navClass}>
              <FaHeart className="text-red-500" />
              <span className="hidden sm:inline">Favoritos</span>
              {favorites.length > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-2xl px-4 pt-12 pb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{titulo}</h1>
        <p className="mt-3 text-stone-500">{texto}</p>
      </header>
    </>
  )
}
