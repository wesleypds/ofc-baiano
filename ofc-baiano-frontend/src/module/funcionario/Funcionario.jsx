import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Input, InputAdornment, Box } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";


import { GetById } from "../../services/funcionario/funcionarioService.js";
import {HandleSubmitForm} from "../../utils/Form/FormUtils.js"


const Funcionario = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState("Houve um erro em validar seus dados!");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});
  
  const { id } = useParams();

  const [dataForm, setDataForm] = useState({
    nome: "",
    email: "",
    salario: "",
    telefone: "",
    disponibilidade: false,
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
      HandleSubmitForm(id, "funcionarios", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }

  const validate = () => {
    const newErrors = {};
    if (!dataForm.nome) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (dataForm.nome.length < 2 || dataForm.nome.length > 100) {
      newErrors.nome = 'Nome deve ter entre 2 e 100 caracteres';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dataForm.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailPattern.test(dataForm.email)) {
      newErrors.email = 'Email inválido';
    }
    const telefonePattern = /\(\d{2}\) \d{5}-\d{4}/;
    if (!dataForm.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!telefonePattern.test(dataForm.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (99) 99999-9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // const handleRadioChange = (e) => {
  //   setDataForm({
  //     ...dataForm,
  //     disponibilidade: e.target.value == 'sim',
  //   });
  // };

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
        <h1 className='mb-4'>
          <b>Cadastro de Funcionários</b>
        </h1>
        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField 
                label="Nome do Funcionário" 
                variant="standard" 
                type="text"
                required 
                fullWidth
                name="nome"
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                onChange={handleChange}
                value={dataForm.nome}
                InputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.nome}
                helperText={errors.nome}
              />

              <TextField 
                label="Telefone"
                variant="standard"
                required
                name="telefone"
                className="mb-3"
                type="text"
                onChange={handleChange}
                value={dataForm.telefone}
                error={!!errors.telefone}
                helperText={errors.telefone}
              />

              <TextField 
                label="E-mail"
                variant="standard"
                required
                name="email"
                className="mb-3"
                type="email"
                onChange={handleChange}
                value={dataForm.email}
                error={!!errors.email}
                helperText={errors.email}
              />


              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Salário</InputLabel>
                <Input  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                name="salario"
                onChange={handleChange}
                value={dataForm.salario}
                type="number"
                />
              </FormControl> 

              {/* <FormControl fullWidth className="mb-3" variant="standard">
                <FormLabel>Disponibilidade</FormLabel>
                <RadioGroup name="disponibilidade"
                value={dataForm.disponibilidade ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                >
                  <FormControlLabel control={<Radio />} value="sim" label="Sim"/>
                  <FormControlLabel control={<Radio />} value="nao" label="Não"/>
                </RadioGroup>
              </FormControl> */}

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
            
            <ButtonCancel route="/funcionarios"/>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Funcionario;
