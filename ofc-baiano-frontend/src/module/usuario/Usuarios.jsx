import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";

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
      <div className="container">
        <h1 className="mt-4">
          <b>Cadastro de Usuários</b>
        </h1>
        <div className="mt-4">
          <div className="col-md-6">
            <FormControl fullWidth className="mb-3">
              <TextField
                label="Usuário"
                variant="outlined"
                required
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth className="mb-3">
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                required
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth className="mb-3">
              <InputLabel>Permissão do Usuário</InputLabel>
              <Select label="permissao">
                <MenuItem selected>Selecione...</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="funcionario">Funcionário</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth className="mb-3">
              <TextField label="Contato" variant="outlined" required />
            </FormControl>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Usuarios;
