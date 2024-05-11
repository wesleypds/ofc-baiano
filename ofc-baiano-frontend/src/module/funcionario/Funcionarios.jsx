import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";

const Funcionarios = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();
  const redirect = () => {
    const token  = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    console.log(locationUrl)
    navigate('/funcionario', { state: { token,  userInfo }});
  }

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1><b>GRID de Funcionários</b></h1>

      <Button onClick={redirect} variant='contained'>teste</Button>
    </LayoutBase>
  );
};

export default Funcionarios;
