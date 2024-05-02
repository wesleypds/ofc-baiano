
import { Layout } from 'antd';

import { MenuList } from './MenuList.jsx';
import HeaderBar from './Header.jsx';
import FooterBar from './Footer.jsx';
import { BiBorderAll } from 'react-icons/bi';
import { MdMargin } from 'react-icons/md';

const { Header, Footer, Sider,  Content } = Layout;



function LayoutBase({children, userInfo}) {

  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    color: '#fff',
    backgroundColor: '#c4c4c4',
  };
  

  const layoutStyle = {
    minHeight: "100vh",
    backgroundColor: 'red',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider >
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img width={135} src="../src/assets/img/Logo.png" alt="Oficina do Baiano" />
        </div>
        <MenuList/>
      </Sider>
      <Layout>
        <HeaderBar userInfo={userInfo}/>
        <Content style={contentStyle}>
          <div style={{margin:"20px", backgroundColor:"white", padding:"25px", color:"black", textAlign: "center"}}>
            {children}
          </div>
        </Content>
        <FooterBar/>
      </Layout>
    </Layout>
  );
}



export default LayoutBase;
