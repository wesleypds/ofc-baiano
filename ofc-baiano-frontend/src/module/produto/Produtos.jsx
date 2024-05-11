import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { Button } from 'antd';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

const Produtos = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();
  const redirect = () => {
    const token  = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate('/produto', { state: { token,  userInfo }});
  }

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1><b>GRID Produtos</b></h1>
      <DataGrid columns={columns} rows={rows} />

     <Button onClick={redirect}>teste</Button>
     
    </LayoutBase>
  );
};

export default Produtos;
