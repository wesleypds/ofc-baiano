import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"

const Servicos = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }
  }, [navigate]);


  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1><b>SISTEMA GRID SERVICO</b></h1>
    </LayoutBase>
  );
};

export default Servicos;
