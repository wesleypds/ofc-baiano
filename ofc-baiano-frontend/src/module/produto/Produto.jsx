import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { Button, FormControl, TextField } from '@mui/material';

const Produto = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1><b>Cadastro de Produtos</b></h1>

      <FormControl fullWidth>
        <TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Quantidade em Estoque"
          variant="outlined"
          fullWidth
          type="number"
          required
        />

        <TextField
          label="Valor"
          variant="outlined"
          type="number"
        />

        <Button type="submit" variant="contained">Cadastrar</Button>
      </FormControl>
    </LayoutBase>
  );
};

export default Produto;
