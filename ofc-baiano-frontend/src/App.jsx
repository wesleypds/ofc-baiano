import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./module/login/Login.jsx"
import Home from "./module/home/Home.jsx"
import Produtos from "./module/produto/Produtos.jsx"
import Produto from "./module/produto/Produto.jsx"
import Usuarios from "./module/usuario/Usuarios.jsx"
import Usuario from "./module/usuario/Usuario.jsx"
import Veiculos from "./module/veiculo/Veiculos.jsx"
import Veiculo from "./module/veiculo/Veiculo.jsx"
import Clientes from "./module/cliente/Clientes.jsx"
import Cliente from "./module/cliente/Cliente.jsx"
import PreOrcamentos from "./module/preorcamento/PreOrcamentos.jsx"
import PreOrcamento from "./module/preorcamento/PreOrcamento.jsx"
import Orcamentos from "./module/orcamento/Orcamentos.jsx"
import Orcamento from "./module/orcamento/Orcamento.jsx"
import Agendamentos from "./module/agendamento/Agendamentos.jsx"
import Agendamento from "./module/agendamento/Agendamento.jsx"
import Encerramento from "./module/encerramento/Encerramento.jsx"
import Encerramentos from "./module/encerramento/Encerramentos.jsx"
import Servicos from "./module/servico/Servicos.jsx"
import Servico from "./module/servico/Servico.jsx"
import Funcionarios from "./module/funcionario/Funcionarios.jsx"
import Funcionario from "./module/funcionario/Funcionario.jsx"

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
          <Route path="/produto/:id" element={<Produto />} />

          <Route path="/servicos" element={<Servicos/>}/>
          <Route path="/servico" element={<Servico/>}/>
          <Route path="/servico/:id" element={<Servico />} />

          <Route path="/usuario" element={<Usuario/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/usuario/:id" element={<Usuario/>}/>

          <Route path="/funcionarios" element={<Funcionarios/>}/>
          <Route path="/funcionario" element={<Funcionario/>}/>
          <Route path="/funcionario/:id" element={<Funcionario/>}/>

          <Route path="/clientes" element={<Clientes/>}/>
          <Route path="/cliente" element={<Cliente/>}/>
          <Route path="/cliente/:id" element={<Cliente/>}/>
          
          <Route path="/veiculos" element={<Veiculos/>}/>
          <Route path="/veiculo" element={<Veiculo/>}/>
          <Route path="/veiculo/:id" element={<Veiculo />} />

          <Route path="/preorcamentos" element={<PreOrcamentos/>}/>
          <Route path="/preorcamento" element={<PreOrcamento/>}/>
          <Route path="/preorcamento/:id" element={<PreOrcamento/>}/>

          <Route path="/orcamentos" element={<Orcamentos/>}/>
          <Route path="/orcamento" element={<Orcamento/>}/>
          <Route path="/orcamento/:id" element={<Orcamento/>}/>

          <Route path="/agendamentos" element={<Agendamentos/>}/>
          <Route path="/agendamento" element={<Agendamento/>}/>
          
          <Route path="/encerramentos" element={<Encerramentos/>}/>
          <Route path="/encerramento" element={<Encerramento/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
