import React, { useState, useEffect } from "react";
import { useNavigate , useLocation, useParams } from "react-router-dom";
import { TextField, FormControl, Box} from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonCancel from "../../components/ButtonCancel.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";

import { GetById } from "../../services/cliente/clienteService.js";
import {HandleSubmitForm} from "../../utils/Form/FormUtils.js"

const Cliente = () => {

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
    endereco: "",
    telefone: "",
    email: "",
    cpf:"",
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
      HandleSubmitForm(id, "clientes", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }

  const validate = () => {
    const newErrors = {};

    // if (!dataForm.nome) {
    //   newErrors.nome = 'Nome é obrigatório';
    // }

    // if (!dataForm.usuario) {
    //   newErrors.usuario = 'Usuário é obrigatório';
    // }

    // if (!dataForm.senha) {
    //   newErrors.senha = 'Senha é obrigatória';
    // } else if (dataForm.senha.length < 6) {
    //   newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    // }

    // if (!dataForm.tipo) {
    //   newErrors.tipo = 'Tipo é obrigatório';
    // }

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!dataForm.email) {
    //   newErrors.email = 'Email é obrigatório';
    // } else if (!emailPattern.test(dataForm.email)) {
    //   newErrors.email = 'Email inválido';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
    if (id) {
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
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                name="nome"
                onChange={handleChange}
                value={dataForm.nome}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.nome}
                helperText={errors.nome}
              />

              
              <TextField 
                label="CPF" 
                variant="standard" 
                type="text"
                name="cpf"
                required 
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                value={dataForm.cpf}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.cpf}
                helperText={errors.cpf}
              />

              <TextField 
                label="Endereço" 
                name="endereco"
                variant="standard" 
                type="text"
                required
                value={dataForm.endereco}
                onChange={handleChange}
                className="mb-3"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.endereco}
                helperText={errors.endereco}
              />

              <TextField
                label="Telefone de Contato"
                variant="standard"
                name="telefone"
                type="text"
                required
                onChange={handleChange}
                className="mb-3"
                value={dataForm.telefone}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.telefone}
                helperText={errors.telefone}
              />

              <TextField 
                label="E-mail" 
                variant="standard" 
                type="email"
                required
                name="email"
                className="mb-3"
                value={dataForm.email}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.email}
                helperText={errors.email}

              />

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
            
            <ButtonCancel route="/clientes"/>
            
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Cliente;
