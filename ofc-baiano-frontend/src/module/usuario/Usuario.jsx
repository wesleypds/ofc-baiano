import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {HandleSubmitForm} from "../../utils/Form/FormUtils.js"

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Input,
  Box
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "bootstrap/dist/css/bootstrap.min.css";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";
import ButtonCancel from "../../components/ButtonCancel.jsx";

import { GetById } from "../../services/usuario/usuarioService.js";

const Usuario = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState("Houve um erro em validar seus dados!");

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});
  
  const { id } = useParams();
  const [dataForm, setDataForm] = useState({
    nome: "",
    senha: "",
    tipo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };


  const submitForm = ()=>{
    if(validate()){
      HandleSubmitForm(id, "usuarios", dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate)
    }
  }
  const validate = () => {
    const newErrors = {};

    if (!dataForm.nome) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!dataForm.usuario) {
      newErrors.usuario = 'Usuário é obrigatório';
    }

    if (!dataForm.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (dataForm.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (!dataForm.tipo) {
      newErrors.tipo = 'Tipo é obrigatório';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dataForm.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailPattern.test(dataForm.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
    if (id) {
      setTitleButton("Atualizar");
      (async () => {
        var dataUser = await GetById(id);
        setDataForm(dataUser.data);
      })();
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h1 className=" mb-4">
          <b>Cadastro de Usuários</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <TextField
                label="Nome Completo"
                variant="standard"
                required
                value={dataForm.nome}
                name="nome"
                onChange={handleChange}
                fullWidth
                className="mb-3"
                InputLabelProps={{
                  shrink: true,
                  }}
                error={!!errors.nome}
                helperText={errors.nome}
              />

              <TextField
                label="Usuário"
                variant="standard"
                required
                value={dataForm.usuario}
                name="usuario"
                onChange={handleChange}
                fullWidth
                className="mb-3"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.usuario}
                helperText={errors.usuario}
              />

              <FormControl className="mb-3" fullWidth variant="standard">
                <InputLabel shrink>Senha</InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={dataForm.senha}
                  name="senha"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.senha}
                />
                {errors.senha && <div style={{ color: 'red', fontSize: '12px' }}>{errors.senha}</div>}
              </FormControl>

              <FormControl fullWidth className="mb-3" variant="filled">
                <InputLabel shrink>Tipo</InputLabel>
                <Select
                  variant="filled"
                  value={dataForm.tipo}
                  name="tipo"
                  onChange={handleChange}
                  error={!!errors.tipo}
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="funcionario">Funcionário</MenuItem>
                </Select>
                {errors.tipo && <div style={{ color: 'red', fontSize: '12px' }}>{errors.tipo}</div>}
              </FormControl>

              <TextField
                label="E-Mail"
                variant="standard"
                required
                value={dataForm.email}
                name="email"
                onChange={handleChange}
                type="email"
                className="mb-3"
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

            <ButtonCancel route="/usuarios" />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Usuario;
