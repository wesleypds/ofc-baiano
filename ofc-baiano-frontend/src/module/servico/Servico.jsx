
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Input
} from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

const Servico = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h3 className=" mb-4">
          <b>Cadastro de Serviços</b>
        </h3>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Nome do Serviço"
                variant="standard"
                required
                fullWidth
                className="mb-3"
              />

              <TextField 
                label="Tempo de Conclusão" 
                variant="standard" 
                fullWidth
                className="mb-3"
              />

              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Valor</InputLabel>
                <Input startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                />
              </FormControl> 

              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Mecânico Especialista</InputLabel>
                <Select variant="standard">
                  <MenuItem value="tiao lanterneiro">Tião Lanterneiro</MenuItem>
                  <MenuItem value="carioca">Carioca</MenuItem>
                  <MenuItem value="marquinho">Marquinho</MenuItem>
                </Select>
              </FormControl>

              <TextField 
                label="Complexidade" 
                variant="standard" 
                fullWidth
                className="mb-3" 
              />
            </FormControl>
          </div>
        </div>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister />
            
            <ButtonCancel route="/servicos"/>
          </div>
        </div>        
      </div>
    </LayoutBase>
  );
};

export default Servico;
