import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { FormControl, TextField, InputAdornment, InputLabel, Input, Box } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";

import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

import { GetById } from "../../services/produto/produtoService.js";
import {HandleSubmitForm} from "../../utils/Form/FormUtils.js"

const Produto = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState("Houve um erro em validar seus dados!");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});

  const [dataForm, setDataForm] = useState({
    nome: "",
    codigo: "",
    quantidade: "",
    valor: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = ()=>{
    if(validate()){
      HandleSubmitForm(id, "produtos", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
  };

  const generateProductCode = (name) => {
    const initials = getInitials(name);
    const uniqueId = uuidv4().slice(0, 3);
    return `${initials}${uniqueId}`;
  };


  const validate = () => {
    const newErrors = {};

    if (!dataForm.nome) {
      newErrors.nome = 'Nome do produto é obrigatório';
    } else if (dataForm.nome.length < 2 || dataForm.nome.length > 100) {
      newErrors.nome = 'O nome do produto deve ter mais que 2 caracteres';
    }

    if (!dataForm.quantidade) {
      newErrors.quantidade = 'Quantidade é obrigatório';
    }

    if (!dataForm.valor) {
      newErrors.valor = 'Valor é obrigatório';
    }

    if (!dataForm.codigo) {
      dataForm.codigo = generateProductCode(dataForm.nome);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
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
        <h3 className='mb-4'>
          <b>Cadastro de Produto</b>
        </h3>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Nome do Produto"
                variant="standard"
                required
                type="text"
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
                label="Código do Produto"
                variant="standard"
                type="text"
                className="mb-3"
                name="codigo"
                onChange={handleChange}
                value={dataForm.codigo}
                error={!!errors.codigo}
              />

              <TextField
                label="Quantidade em Estoque"
                variant="standard"
                type="number"
                required
                className="mb-3"
                name="quantidade"
                onChange={handleChange}
                value={dataForm.quantidade}
                error={!!errors.quantidade}
                helperText={errors.quantidade}
              />

              <FormControl fullWidth className="mb-3"
              required
              variant="standard">
                <InputLabel>Valor</InputLabel>
                <Input startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                name="valor"
                onChange={handleChange}
                value={dataForm.valor}
                type='number'
                error={!!errors.valor}
                helperText={errors.valor}
                />
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
            
            <ButtonCancel route="/produtos"/>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Produto;
