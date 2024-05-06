import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Menu } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";

const Usuarios = () => {
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
        <b>Cadastro de Usuários</b>
      </h1>
      <div>
        <FormControl fullWidth>
          <TextField 
            label="Usuário" 
            variant="outlined" 
            required 
            fullWidth 
          />

          <TextField 
            label="Senha" 
            variant="outlined" 
            type="password" 
            required 
            fullWidth 
          />

          <FormControl>
            <InputLabel>Permissão do Usuário</InputLabel>
            <Select label="permissao">
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
              <MenuItem value="funcionario">Funcionário</MenuItem>
            </Select>
          </FormControl>

          <IMaskInput/>

          <TextField 
            label="Contato"
            variant="outlined"
            required
            type="number"
            mask="(#00) 00000-0000"
            definitions={{
              '#': /[1-9]/,
            }}
          />

        </FormControl>

        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </div>
    </LayoutBase>
  );
};

export default Usuarios;
