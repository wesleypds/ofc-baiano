import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function FooterBar() {
    const footerStyle = {
        textAlign: 'center',
        color: '#555',
        backgroundColor: '#f0f2f5'
    };

    return (
        <Footer style={footerStyle}>
            Oficina do baiano © 2024
        </Footer>
    );
}

export default FooterBar;
