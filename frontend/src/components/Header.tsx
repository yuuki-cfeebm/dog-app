import { FaHeart, FaHome, FaRegHeart } from "react-icons/fa"
import { Link } from "react-router-dom"

interface HeaderProps {
  titulo: string,
  texto: string
}

export default function Header({titulo, texto}: HeaderProps) {

  const path = location.pathname === "/favoritos"

  return(
    <header className="text-center relative w-full p-4 pt-12">
      <h1 className="font-bold text-4xl">{titulo}</h1>
      <span className="text-gray-500">{texto}</span>
      { path ? (
        <Link className="absolute right-0 top-0 cursor-pointer p-4" to="/">
        <FaHome size={40}/>
      </Link>
      ) : (
      <Link className="absolute right-0 top-0 cursor-pointer p-4" to="/favoritos">
        <FaHeart color="red" size={40}/>
      </Link>
      )}
    </header>
  )
}