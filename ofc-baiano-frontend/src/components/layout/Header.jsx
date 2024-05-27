import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

function HeaderBar({userInfo}) {

  const navigate = useNavigate(); 

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


  const menu = (
    <Menu>
      <Menu.Item key="configuracoes" icon={<SettingOutlined />}>
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
