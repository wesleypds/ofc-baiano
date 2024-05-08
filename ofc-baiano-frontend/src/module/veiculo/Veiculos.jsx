
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";

const Veiculos = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h1 class="">
        <b>Cadastro de Veículos</b>
      </h1>
      <div>
        <FormControl fullWidth>
          <TextField
            label="Marca"
            variant="outlined"
            required
            fullWidth
          />

          <TextField 
            label="Modelo" 
            variant="outlined" 
            fullWidth 
            required
          />

          <TextField 
            label="Ano de Fabricação" 
            variant="outlined" 
            type="number"
            required
          />
        </FormControl>

        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </div>
    </LayoutBase>
  );
};

export default Veiculos;
