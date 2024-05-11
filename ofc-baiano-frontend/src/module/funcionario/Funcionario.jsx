import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Input, InputAdornment } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

const Funcionario = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h1 className='mb-4'>
          <b>Cadastro de Funcionários</b>
        </h1>
        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField 
                label="Nome do Funcionário" 
                variant="standard" 
                required 
                fullWidth
                className="mb-3"
                type="text"
              />

              <TextField 
                label="Contato"
                variant="standard"
                required
                className="mb-3"
                type="text"
              />

              <TextField 
                label="Especioalidade"
                variant="standard"
                required
                className="mb-3"
                type="text"
              />

              <TextField 
                label="E-mail"
                variant="standard"
                required
                className="mb-3"
                type="email"
              />


              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Salário</InputLabel>
                <Input startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                />
              </FormControl> 

              <FormControl fullWidth className="mb-3" variant="standard">
                <FormLabel>Disponibilidade</FormLabel>
                <RadioGroup name="disponibilidade">
                  <FormControlLabel control={<Radio />} value="sim" label="Sim"/>
                  <FormControlLabel control={<Radio />} value="nao" label="Não"/>
                </RadioGroup>
              </FormControl>

            </FormControl>
          </div>        
        </div>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister />
            
            <ButtonCancel route="/funcionarios"/>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Funcionario;
