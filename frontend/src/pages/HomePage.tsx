import Header from "../components/Header";
import Input from "../components/Input";
import Main from "../components/Main";

export default function HomePage() {
  return(
    <>
      <Header titulo="Olá, seja Bem-vindo ao Dog App" texto="Digite no campo abaixo uma raça canina específica e uma foto aleatória será gerada"/>
      <Main>
        <Input />
      </Main>
    </>
  )
}