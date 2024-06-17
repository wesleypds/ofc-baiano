
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { TextField, Box, FormControl } from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

import { GetById } from "../../services/veiculo/veiculoService.js";
import { HandleSubmitForm } from "../../utils/Form/FormUtils.js"

const Veiculo = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState("Houve um erro em validar seus dados!");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});

  const [dataForm, setDataForm] = useState({
    marca: "",
    modelo: "",
    cor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };


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



  const validate = () => {
    const newErrors = {};

    if (!dataForm.marca) {
      newErrors.marca = 'Marca do veículo é obrigatório';
    }
    if (!dataForm.modelo) {
      newErrors.modelo = 'Modelo do veículo é obrigatório';
    }
    if (!dataForm.cor) {
      newErrors.cor = 'Cor do veículo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const submitForm = ()=>{
    if(validate()){
      HandleSubmitForm(id, "veiculos", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h3 class="mb-4">
          <b>Cadastro de Veículos</b>
        </h3>
        
        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Marca"
                variant="standard"
                required
                fullWidth
                type="text"
                name="marca"
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                onChange={handleChange}
                value={dataForm.marca}
                error={!!errors.marca}
                helperText={errors.marca}
              />

              <TextField 
                label="Modelo" 
                variant="standard" 
                fullWidth 
                required
                type="text"
                className={`mb-3 ${isReadOnly ? 'input-readonly-field' : ''}`}
                name="modelo"
                onChange={handleChange}
                value={dataForm.modelo}
                error={!!errors.modelo}
                helperText={errors.modelo}
              />

              <TextField 
                label="Cor" 
                variant="standard" 
                type="text"
                required
                className="mb-3"
                name="cor"
                onChange={handleChange}
                value={dataForm.cor}
                error={!!errors.cor}
                helperText={errors.cor}
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
              
              <ButtonCancel route="/veiculos"/>
            </div>
          </div>
      </div>
    </LayoutBase>
  );
};

export default Veiculo;
