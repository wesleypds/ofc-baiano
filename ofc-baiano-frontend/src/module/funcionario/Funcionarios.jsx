import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Menu, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";

const Funcionarios = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1>
        <b>Cadastro de Funcionários</b>
      </h1>
      <div>
        <FormControl fullWidth>
          <TextField 
            label="Nome do Funcionário" 
            variant="outlined" 
            required 
            fullWidth 
          />

          <TextField 
            label="Contato"
            variant="outlined"
            required
          />

          <TextField 
            label="Especioalidade"
            variant="outlined"
            required
          />

          <TextField 
            label="E-mail"
            variant="outlined"
            required
          />


          <TextField 
            label="Salário"
            variant="outlined"
            type="number"
            required
          />

          <FormControl>
            <FormLabel>Disponibilidade</FormLabel>
            <RadioGroup name="disponibilidade">
              <FormControlLabel control={<Radio />} value="sim" label="Sim"/>
              <FormControlLabel control={<Radio />} value="nao" label="Não"/>
            </RadioGroup>
          </FormControl>

        </FormControl>

        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </div>
    </LayoutBase>
  );
};

export default Funcionarios;
