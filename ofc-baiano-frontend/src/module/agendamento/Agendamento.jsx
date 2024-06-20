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
  InputAdornment,
} from "@mui/material";
import { parseISO, format } from "date-fns";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonCancel from "../../components/ButtonCancel.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";

import { ListAll as OrcamentoListAll } from "../../services/orcamento/orcamentoService.js";
import { ListAll as FuncionarioListAll } from "../../services/funcionario/funcionarioService.js";

import { GetById } from "../../services/agendamento/agendamentoService.js";
import { HandleSubmitForm } from "../../utils/Form/FormUtils.js";

const Agendamento = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [msgInvalidForm, setMsgInvalidForm] = useState(
    "Houve um erro em validar seus dados!"
  );
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [titleButton, setTitleButton] = useState("Cadastrar");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const [orcamentoList, setOrcamentoList] = useState([]);
  const [funcionarioList, setFuncionarioList] = useState([]);

  const [dataForm, setDataForm] = useState({
    orcamento: "",
    inicioServico: new Date().toISOString().split("T")[0],
    finalizado: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = () => {
    if (validate() && !isInvalidForm) {
      var dados = {
        orcamento: {
          id: dataForm.orcamento,
        },
        inicioServico: dataForm.inicioServico,
        funcionario: {
          id: dataForm.funcionario.id,
        },
      };
      HandleSubmitForm(
        id,
        "agendamentos",
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

    if (!dataForm.orcamento) {
      newErrors.orcamento = "Orçamento é obrigatório";
    }

    // if (dataForm.servicos.length === 0) {
    //   setIsInvalidForm(true);
    //   setMsgInvalidForm("Pelo menos um serviço deve ser selecionado");
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }
    if (id) {
      setIsReadOnly(true);
      setTitleButton("Atualizar");
      (async () => {
        var dados = (await GetById(id)).data;
        setDataForm({
          id: dados.id,
          orcamento: dados.orcamento.id,
          inicioServico: format(parseISO(dados.inicioServico), "yyyy-MM-dd"),
          funcionario: dados.funcionario,
        });
      })();
    }

    (async () => {
      setOrcamentoList((await OrcamentoListAll()).data.filter(item => item.aprovado === true));
      setFuncionarioList((await FuncionarioListAll()).data.filter(item => item.disponibilidade === false ||  item.disponibilidade ===null));
    })();
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h1 className="mb-4">
          <b>Cadastro de Agendamento</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <FormControl
                fullWidth
                required
                error={!!errors.orcamento}
                helperText={errors.orcamento}
                className={`mb-3 ${isReadOnly ? "input-readonly-field" : ""}`}
              >
                <InputLabel shrink>Orçamento Aprovado</InputLabel>
                <Select
                  label="Orçamento Aprovado"
                  variant="standard"
                  value={dataForm.orcamento}
                  onChange={handleChange}
                  name="orcamento"
                  displayEmpty
                  inputProps={{ readOnly: isReadOnly }}
                >
                  <MenuItem value="">
                    <em>Escolha um orçamento</em>
                  </MenuItem>
                  {orcamentoList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.id}: {option.cliente.veiculos[0].veiculo.modelo} /{" "}
                      {option.cliente.veiculos[0].placaVeiculo}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.orcamento}</FormHelperText>
              </FormControl>

              <TextField
                label="Data de Início do Serviço"
                type="date"
                name="inicioServico"
                variant="standard"
                value={dataForm.inicioServico}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.inicioServico}
                helperText={errors.inicioServico}
                fullWidth
                className={`mb-3 `}
              />

              <FormControl
                fullWidth
                required
                error={!!errors.funcionario}
                helperText={errors.funcionario}
                className={`mb-3 ${isReadOnly ? "input-readonly-field" : ""}`}
              >
                <InputLabel shrink>Funcionário Responsável</InputLabel>
                <Select
                  label="Funcionário Responsável"
                  variant="standard"
                  value={dataForm.funcionario}
                  onChange={handleChange}
                  name="funcionario"
                  displayEmpty
                  inputProps={{ readOnly: isReadOnly }}
                >
                  <MenuItem value="">
                    <em>Escolha um funcionário</em>
                  </MenuItem>
                  {funcionarioList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.funcionario}</FormHelperText>
              </FormControl>
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

            <ButtonCancel route="/agendamentos" />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Agendamento;
