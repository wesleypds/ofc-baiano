import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, FormControl } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonCancel from "../../components/ButtonCancel.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";

const Cliente = () => {
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
        <h1 className="mb-4">
          <b>Cadastro de Clientes</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Nome Completo"
                variant="standard"
                type="text"
                required
                fullWidth
                className="mb-3"
              />

              <TextField 
                label="Endereço" 
                variant="standard" 
                type="text"
                required 
                className="mb-3"
              />

              <TextField
                label="Telefone de Contato"
                variant="standard"
                type="text"
                required
                className="mb-3"
              />

              <TextField 
                label="E-mail" 
                variant="standard" 
                type="email"
                required
                className="mb-3"
              />

              <TextField 
                label="CPF" 
                variant="standard" 
                type="text"
                required 
                className="mb-3"
              />
            </FormControl>
          </div>
        </div>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister />
            
            <ButtonCancel route="/clientes"/>
            
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Cliente;
