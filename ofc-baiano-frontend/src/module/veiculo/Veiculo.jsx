
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, Button, FormControl } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

const Veiculo = () => {
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
        <h1 class="mb-4">
          <b>Cadastro de Veículos</b>
        </h1>
        
        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Marca"
                variant="standard"
                required
                fullWidth
                type="text"
                className="mb-3"
              />

              <TextField 
                label="Modelo" 
                variant="standard" 
                fullWidth 
                required
                type="text"
                className="mb-3"
              />

              <TextField 
                label="Cor" 
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
              
              <ButtonCancel route="/veiculos"/>
            </div>
          </div>
      </div>
    </LayoutBase>
  );
};

export default Veiculo;
