import React from "react";
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { 
    HomeOutlined, 
    ScheduleOutlined, 
    UserAddOutlined, 
    SettingOutlined,
    CheckCircleOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    UsergroupAddOutlined,
    CarOutlined,
    ProductOutlined,
    GoldOutlined,
    UserOutlined,
    PlusOutlined
} from '@ant-design/icons';

import "../../style/components/layout/MenuList.css"

export const MenuList = () =>{

    const navigate = useNavigate();
    const locationUrl = useLocation();

    const redirectPage = (page)=>{
        const token = locationUrl.state.token;
        const userInfo = locationUrl.state.userInfo

        navigate('/'+ page, { state: { token,  userInfo }}); 
    };
    
    return (
        <Menu theme="dark" mode="inline" className="menu-bar">
            <Menu.Item key="home" icon={<HomeOutlined/>} onClick={()=>redirectPage("home")}>
                Home
            </Menu.Item>
            <Menu.SubMenu key="Cadastros" icon={<PlusOutlined/>} title="Cadastro">
                <Menu.Item key="produto" icon={<ProductOutlined/>} onClick={()=>redirectPage("produtos")} >Produtos</Menu.Item>
                <Menu.Item key="servicos" icon={<GoldOutlined/>} onClick={()=>redirectPage("servico")}>Serviços</Menu.Item>
                <Menu.Item key="veiculo" icon={<CarOutlined/>} onClick={()=>redirectPage("veiculo")}>Veículo</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="cliente" icon={<UserOutlined/>} onClick={()=>redirectPage("cliente")}>
                Cliente
            </Menu.Item>
            <Menu.Item key="preOrcamento" icon={<PlusCircleOutlined/>} onClick={()=>redirectPage("preOrcamento")}>
                Pre-orçamento
            </Menu.Item>
            <Menu.Item key="orcamento" icon={<MoneyCollectOutlined/>} onClick={()=>redirectPage("orcamento")}>
                Orçamento
            </Menu.Item>
            <Menu.Item key="agendamento" icon={<ScheduleOutlined/>} onClick={()=>redirectPage("agendamento")}>
                Agendamentos
            </Menu.Item>
            <Menu.Item key="encerramento" icon={<CheckCircleOutlined/>} onClick={()=>redirectPage("encerramento")}>
                Encerramentos
            </Menu.Item>
            <Menu.SubMenu key="configuracao" icon={<SettingOutlined/>} title="Configurações">
                <Menu.Item key="usuario" icon={<UserAddOutlined/>} onClick={()=>redirectPage("usuario")} > Usuários</Menu.Item>
                <Menu.Item key="funcionario" icon={<UsergroupAddOutlined/>} onClick={()=>redirectPage("funcionario")} > Funcionários</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}

export default MenuList
