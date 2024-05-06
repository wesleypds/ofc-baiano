import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";

const Servicos = () => {
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
        <b>Cadastro de Serviços</b>
      </h1>
      <div>
        <FormControl fullWidth>
          <TextField
            label="Nome do Serviço"
            variant="outlined"
            required
            fullWidth
          />

          <TextField label="Tempo de Conclusão" variant="outlined" fullWidth />

          <TextField label="Valor" variant="outlined" required />

          <FormControl fullWidth>
            <InputLabel>Mecânico Especialista: </InputLabel>
            <Select label="mecanico especialista">
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="tiao lanterneiro">Tião Lanterneiro</MenuItem>
              <MenuItem value="carioca">Carioca</MenuItem>
              <MenuItem value="marquinho">Marquinho</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Complexidade" variant="outlined" fullWidth />
        </FormControl>

        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </div>
    </LayoutBase>
  );
};

export default Servicos;
