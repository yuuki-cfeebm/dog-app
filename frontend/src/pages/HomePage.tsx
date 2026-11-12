import Header from "../components/Header"
import Input from "../components/Input"
import Main from "../components/Main"

export default function HomePage() {
  return (
    <>
      <Header
        titulo="Encontre o seu cachorro favorito"
        texto="Digite uma raça e veja uma foto aleatória. Gostou? Salve nos favoritos."
      />
      <Main>
        <Input />
      </Main>
    </>
  )
}
