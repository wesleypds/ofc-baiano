
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Input,
  Box
} from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";


import { GetById } from "../../services/servico/servicoService.js";
import {HandleSubmitForm} from "../../utils/Form/FormUtils.js"

const Servico = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState("Houve um erro em validar seus dados!");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});

  const [dataForm, setDataForm] = useState({
    tipo: "",
    tempoEstimado: "",
    valor: "",
    complexidade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = ()=>{
    if(validate()){
      HandleSubmitForm(id, "servicos", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }

  const validate = () => {
    const newErrors = {};

    if (!dataForm.tipo) {
      newErrors.tipo = 'Nome é obrigatório';
    } else if (dataForm.tipo.length < 2 || dataForm.tipo.length > 100) {
      newErrors.tipo = 'Nome do serviço deve ter entre 2 e 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    } if (id) {
      setIsReadOnly(true)
      setTitleButton("Atualizar");
      (async () => {
        var dataItem = await GetById(id);
        setDataForm(dataItem.data);
      })();
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
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                name="tipo"
                onChange={handleChange}
                value={dataForm.tipo}
                error={!!errors.tipo}
                helperText={errors.tipo}
              />

              <TextField 
                label="Tempo de Conclusão" 
                variant="standard" 
                fullWidth
                className="mb-3"
                name="tempoEstimado"
                onChange={handleChange}
                value={dataForm.tempoEstimado}
                error={!!errors.tempoEstimado}
                helperText={errors.tempoEstimado}
              />

              <FormControl fullWidth className="mb-2" variant="standard">
                <InputLabel>Valor</InputLabel>
                <Input startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  name="valor"
                  onChange={handleChange}
                  value={dataForm.valor}
                  type="number"
                  error={!!errors.valor}
                  helperText={errors.valor}
                />
              </FormControl> 

              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Complexidade</InputLabel>
                <Select variant="standard"
                  name="complexidade"
                  value={dataForm.complexidade}
                  onChange={handleChange}
                  error={!!errors.complexidade}
                  helperText={errors.complexidade}
                  >
                  <MenuItem value="FACIL">Fácil</MenuItem>
                  <MenuItem value="MODERADO">Moderado</MenuItem>
                  <MenuItem value="DIFICIL">Difícil</MenuItem>
                </Select>
              </FormControl>

            </FormControl>
          </div>
        </div>

        {isInvalidForm && (
            <Box className={`user-disabled text-light` }>
                <center>{msgInvalidForm}</center>
            </Box>
        )}

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister handleSubmit={submitForm} title={titleButton}/>
            
            <ButtonCancel route="/servicos"/>
          </div>
        </div>        
      </div>
    </LayoutBase>
  );
};

export default Servico;
