import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./module/login/Login.jsx"
import Home from "./module/home/Home.jsx"
import Produtos from "./module/produto/Produtos.jsx"
import Produto from "./module/produto/Produto.jsx"

import Servicos from "./module/servico/Servicos.jsx"
import Usuarios from "./module/usuario/Usuarios.jsx"

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/produtos" element={<Produtos/>}/>
          <Route path="/produto" element={<Produto/>}/>
          <Route path="/servicos" element={<Servicos/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
