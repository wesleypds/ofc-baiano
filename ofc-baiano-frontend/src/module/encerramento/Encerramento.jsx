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

import { ListAll as PreOrcamentoListAll } from "../../services/preorcamento/preOrcamentoService.js";
import { ListAll as ProdutoListAll } from "../../services/produto/produtoService.js";
import { ListAll as ServicoListAll } from "../../services/servico/servicoService.js";

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

  const [preOrcamentoList, setPreOrcamentoList] = useState([]);

  const [isAddOrcameneto, setIsAddOrcameneto] = useState(false);

  const [dataForm, setDataForm] = useState({
    orcamento: "",
    inicioServico: new Date().toISOString().split("T")[0],
    finallzado: false,
    funcionario: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = () => {
    if (validate() && isInvalidForm) {
      var dados = {
        orcamento: {
          id: dataForm.orcamento,
        },
        inicioServico: dataForm.inicioServico,
        finalizado: dataForm.finalizado,
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

    if (!dataForm.preOrcamento) {
      newErrors.preOrcamento = "Pré-Orçamento é obrigatório";
    }

    if (dataForm.servicos.length === 0) {
      setIsInvalidForm(true);
      setMsgInvalidForm("Pelo menos um serviço deve ser selecionado");
    }

    if (dataForm.produtoOrcamentos.length === 0) {
      setIsInvalidForm(true); // verificar se tem algum produto com id nulo
      setMsgInvalidForm("Há um produto que não foi selecionado");
    }

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

        if (dados.produtoOrcamentos.length == 0) setIsAddOrcameneto(true);

        setDataForm({
          id: dados.id,
          preOrcamento: dados.preOrcamento.id,
          dataOrcamento: format(parseISO(dados.dataOrcamento), "yyyy-MM-dd"),
          descontos: dados.descontos,
          problemaMecanico: dados.problemaMecanico,
          produtoOrcamentos: dados.produtoOrcamentos,
          servicos: dados.servicos,
        });
      })();
    } else {
      setIsAddOrcameneto(true);
    }

    (async () => {
      setPreOrcamentoList((await PreOrcamentoListAll()).data);
      setProdutoList((await ProdutoListAll()).data);
      setServicoList((await ServicoListAll()).data);
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
                error={!!errors.preOrcamento}
                helperText={errors.preOrcamento}
                className={`mb-3 ${isReadOnly ? "input-readonly-field" : ""}`}
              >
                <InputLabel shrink>Orçamento</InputLabel>
                <Select
                  label="Orçamento Aprovado"
                  variant="standard"
                  value={dataForm.preOrcamento}
                  onChange={handleChange}
                  name="preOrcamento"
                  displayEmpty
                  inputProps={{ readOnly: isReadOnly }}
                >
                  <MenuItem value="">
                    <em>Escolha um orçamento</em>
                  </MenuItem>
                  {preOrcamentoList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.cliente.nome}:{" "}
                      {option.cliente.veiculos[0].veiculo.modelo} /{" "}
                      {option.cliente.veiculos[0].placaVeiculo}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.preOrcamento}</FormHelperText>
              </FormControl>

              <TextField
                label="Data de Início do Serviço"
                type="date"
                name="inicioServico"
                variant="standard"
                value={dataForm.dataOrcamento}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.dataOrcamento}
                helperText={errors.dataOrcamento}
                fullWidth
                className={`mb-3 `}
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

            <ButtonCancel route="/agendamentos" />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Agendamento;