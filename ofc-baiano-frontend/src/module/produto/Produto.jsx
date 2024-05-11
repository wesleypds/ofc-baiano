import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { FormControl, TextField, InputAdornment, InputLabel, Input } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";

import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

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
      <div className="container-fluid">
        <h1 className='mb-4'>
          <b>Cadastro de Produtos</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Nome do Produto"
                variant="standard"
                required
                type="text"
                className="mb-3"
              />

              <TextField
                label="Quantidade em Estoque"
                variant="standard"
                type="number"
                required
                className="mb-3"
              />

              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Valor</InputLabel>
                <Input startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                />
              </FormControl> 
            </FormControl>
          </div>
        </div>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister />
            
            <ButtonCancel route="/produtos"/>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Produto;
