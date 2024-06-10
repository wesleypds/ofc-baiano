import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

function HeaderBar({userInfo}) {

  const navigate = useNavigate(); 
  const locationUrl = useLocation();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f2f5'
  };

  const goLogin = () => {
    navigate('/');
  };

  const goUser = () => {    
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
  
    navigate('/usuario/'+ userInfo.id, { state: { token, userInfo } });
  };

  const menu = (
    <Menu>
      <Menu.Item key="configuracoes" onClick={goUser} icon={<SettingOutlined />}>
        Configurações
      </Menu.Item>
      <Menu.Item key="sair" onClick={goLogin} icon={<LogoutOutlined />}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={headerStyle}>
      <Dropdown overlay={menu} trigger={['click']}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <UserOutlined style={{ marginRight: 5 }} />
          <span><b>{userInfo.nome}</b></span>
        </div>
      </Dropdown>
    </Header>
  );
}

export default HeaderBar;
