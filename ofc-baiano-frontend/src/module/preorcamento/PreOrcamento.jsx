import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  TextField,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonCancel from "../../components/ButtonCancel.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";

import { GetById } from "../../services/preorcamento/preOrcamentoService.js";
import { ListAll as ClienteListAll } from "../../services/cliente/clienteService.js";
import { ListAll as VeiculoListAll } from "../../services/veiculo/veiculoService.js";

import { HandleSubmitForm } from "../../utils/Form/FormUtils.js";

const PreOrcamento = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState(
    "Houve um erro em validar seus dados!"
  );
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});

  const [clienteList, setClienteList] = useState([]);
  const [veiculoList, setVeiculoList] = useState([]);


  const { id } = useParams();

  const [dataForm, setDataForm] = useState({
    cliente: "",
    veiculo: "",
    escolha: "",
    anoveiculo:"",
    placaVeiculo: "", 
    problema: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = () => {
    if (validate()) {

        var dados = 
        {
          "id": dataForm.id,
          "escolha": dataForm.escolha,
            "cliente": {
                "id": dataForm.cliente,
                "veiculos": [
                    {
                        "veiculo": {
                            "id": dataForm.veiculo
                        },
                        "placaVeiculo": dataForm.placaVeiculo,
                        "anoVeiculo": dataForm.anoVeiculo
                    }
                ]
            },
            "problema": dataForm.problema
        }

      HandleSubmitForm(
        id,
        "preorcamentos",
        dados,
        setIsInvalidForm,
        setMsgInvalidForm,
        locationUrl,
        navigate
      );
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!dataForm.cliente) {
      newErrors.cliente = "Cliente é obrigatório";
    }
    if (!dataForm.veiculo) {
      newErrors.veiculo = "Veículo é obrigatório";
    }
    if (!dataForm.escolha) {
      newErrors.escolha = "Escolha do cliente é obrigatória";
    }
    if (!dataForm.anoVeiculo) {
      newErrors.anoVeiculo = "Ano do veículo é obrigatório";
    } else if (!/^\d{4}$/.test(dataForm.anoVeiculo)) {
      newErrors.anoVeiculo = "Ano do veículo deve conter 4 dígitos";
    }
    if (!dataForm.placaVeiculo) {
      newErrors.placaVeiculo = "Placa do veículo é obrigatória";
    } else if (!/^[A-Z]{3}-\d{4}$/.test(dataForm.placaVeiculo) && !/^[A-Z]{3}\d[A-Z]\d{2}$/.test(dataForm.placaVeiculo)) {
      newErrors.placaVeiculo = "Placa do veículo deve estar no formato AAA-9999 ou ABC1D23";
    }
    if (!dataForm.problema) {
      newErrors.problema = "Descrição do problema é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }

    (async () => {
      setClienteList((await ClienteListAll()).data);
      setVeiculoList((await VeiculoListAll()).data);
    })();

    if (id) {
      setIsReadOnly(true);
      setTitleButton("Atualizar");
      (async () => {
        let dados = (await GetById(id)).data
        setDataForm({
          id: dados.id,
          cliente: dados.cliente.id,
          veiculo: dados.cliente.veiculos[0].veiculo.id,
          escolha: dados.escolha,
          anoVeiculo: dados.cliente.veiculos[0].anoVeiculo,
          placaVeiculo: dados.cliente.veiculos[0].placaVeiculo, 
          problema: dados.problema,
        });
      })();
    }
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h1 className="mb-4">
          <b>Cadastro de Pré-Orçamentos</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">

            <FormControl fullWidth>

              <FormControl
                  fullWidth
                  required
                  error={!!errors.cliente}
                  helperText={errors.cliente}
                  className={`mb-3 ${isReadOnly ? "input-readonly-field" : ""}`}
                >
                  <InputLabel shrink>Cliente</InputLabel>
                  <Select
                    label="Cliente"
                    variant="standard"
                    value={dataForm.cliente}
                    onChange={handleChange}
                    name="cliente"
                    displayEmpty
                    inputProps={{ readOnly: isReadOnly }}
                  >
                    <MenuItem value="">
                      <em>Escolha um cliente</em>
                    </MenuItem>
                    {clienteList.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.cliente}</FormHelperText>
                </FormControl>

              <FormControl
                fullWidth
                required
                error={!!errors.escolha}
                helperText={errors.escolha}
                className={`mb-3`}
              >
                <InputLabel shrink>Escolha do cliente</InputLabel>
                <Select
                  label="Escolha do cliente"
                  variant="standard"
                  value={dataForm.escolha}
                  onChange={handleChange}
                  name="escolha"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Selecione uma opção</em>
                  </MenuItem>
                  <MenuItem value="ORCAMENTO">Orçamento</MenuItem>
                  <MenuItem value="SERVICO">Serviço</MenuItem>
                  <MenuItem value="ORCAMENTO_E_SERVICO">Orçamento e serviço</MenuItem>

                </Select>
                <FormHelperText>{errors.escolha}</FormHelperText>
              </FormControl>

         

              <FormControl
                fullWidth
                required
                error={!!errors.veiculo}
                helperText={errors.veiculo}
                className={`mb-3`}
              >
                <InputLabel shrink>Veículo</InputLabel>
                <Select
                  label="Veículos"
                  variant="standard"
                  value={dataForm.veiculo}
                  onChange={handleChange}
                  name="veiculo"
                  displayEmpty
                  error={!!errors.veiculo}
                  helperText={errors.veiculo}
                >
                  <MenuItem value="">
                    <em>Escolha um veículo</em>
                  </MenuItem>
                  {veiculoList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.marca + " - " + option.modelo + " - " + option.cor }
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.veiculo}</FormHelperText>
              </FormControl>

              <TextField
                label="Ano do Veículo"
                variant="standard"
                type="text"
                name="anoVeiculo"
                required
                className="mb-3"
                value={dataForm.anoVeiculo}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.anoVeiculo}
                helperText={errors.anoVeiculo}
              />

              <TextField
                label="Placa do Veículo"
                variant="standard"
                type="text"
                name="placaVeiculo"
                required
                className="mb-3"
                value={dataForm.placaVeiculo}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}

                error={!!errors.placaVeiculo}
                helperText={errors.placaVeiculo}
              />

              <TextField
                  label="Descrição do problema"
                  variant="standard"
                  type="text"
                  name="problema"
                  required
                  className="mb-3"
                  value={dataForm.problema}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={4}  
                  error={!!errors.problema}
                  helperText={errors.problema}
                />

            </FormControl>
          </div>
        </div>

        {isInvalidForm && (
          <Box className={`user-disabled text-light`}>
            <center>{msgInvalidForm}</center>
          </Box>
        )}

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <ButtonRegister handleSubmit={submitForm} title={titleButton} />

            <ButtonCancel route="/preorcamentos" />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default PreOrcamento;
