import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/general/Header"
import FormName from "./pages/FormName"
import FormIngredient from "./pages/FormIngredient"
import Favorites from "./pages/Favorite"
import Footer from "./components/general/Footer"
import Login from "./pages/Login"
import { useState } from "react"


function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
      <BrowserRouter>
        <Header onLoginClick={() => setShowLogin(true)} />
        <Routes>
          <Route path="/" element={<FormName />} />
          <Route path="/ingredient" element={<FormIngredient />} />
          <Route path="/favorites" element={<Favorites />} />          
        </Routes>
        <Footer />
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </BrowserRouter>
  )
}

export default App
  