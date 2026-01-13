import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FavoritesPage from "./pages/FavoritesPage"
import { Toaster } from "sonner"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
      </Routes>
      <Toaster position="bottom-right" className="bg-red-400"/>
    </BrowserRouter>
  )
}

export default App
