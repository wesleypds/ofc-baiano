import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./module/login/Login.jsx"
import Home from "./module/home/Home.jsx"
import Produtos from "./module/produto/Produtos.jsx"
import Servicos from "./module/servico/Servicos.jsx"
<<<<<<< HEAD
=======
import Usuarios from "./module/usuario/Usuarios.jsx"
>>>>>>> 2b652d2594f508236b282f3daa2a2b71f4cc06a3


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
<<<<<<< HEAD
          <Route path="/servicos" element={<Servicos/>}/>

=======
          <Route path="/produto" element={<Produtos/>}/>
          <Route path="/servicos" element={<Servicos/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
>>>>>>> 2b652d2594f508236b282f3daa2a2b71f4cc06a3
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
