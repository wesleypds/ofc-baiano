import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./module/login/Login.jsx"
import Home from "./module/home/Home.jsx"
import Produtos from "./module/produto/Produtos.jsx"


// import Home from "./containers/home/Home.jsx"
// import Login from "./containers/login/Login.jsx"
// import PacienteHome from "./containers/paciente/PacienteHome.jsx"
// import PacienteCadastro from "./containers/paciente/PacienteCadastro.jsx"

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/produtos" element={<Produtos/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
