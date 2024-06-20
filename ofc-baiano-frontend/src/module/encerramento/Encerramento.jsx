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
  Input
} from "@mui/material";
import { parseISO, format } from "date-fns";

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonCancel from "../../components/ButtonCancel.jsx";
import ButtonRegister from "../../components/ButtonRegister.jsx";

import { ListAll as AgendamentoListAll } from "../../services/agendamento/agendamentoService.js";

import { GetById } from "../../services/agendamento/agendamentoService.js";
import { HandleSubmitForm } from "../../utils/Form/FormUtils.js";

const Encerramento = () => {
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

  const [agendamentoList, setAgendamentoList] = useState([]);

  const [dataForm, setDataForm] = useState({
    dataEntrega: new Date().toISOString().split("T")[0],
    tipoPagamento: "",
    valorFinal: "",
    agendamento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(dataForm)
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = () => {
    if (validate() && !isInvalidForm) {
      var dados = {
        dataEntrega: dataForm.dataEntrega,
        tipoPagamento: dataForm.tipoPagamento,
        valorFinal: dataForm.valorFinal,
        agendamento: {
          id: dataForm.agendamento.id,
        },
      };
      HandleSubmitForm(
        id,
        "encerramentos",
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
      newErrors.preOrcamento = "Agendamento é obrigatório";
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
        setDataForm({
          id: dados.id,
          dataEntrega: format(parseISO(dados.dataEntrega), "yyyy-MM-dd"),
          tipoPagamento: dados.tipoPagamento,
          valorFinal: dados.valorFinal,
          agendamento: dados.agendamento.id,
        });
      })();
    }
    (async () => {
      setAgendamentoList((await AgendamentoListAll()).data);
    })();
  }, [navigate]);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <div className="container-fluid">
        <h1 className="mb-4">
          <b>Cadastro de Encerramento</b>
        </h1>

        <div className="row mt-4 justify-content-md-center">
          <div className="col-6">
            <FormControl fullWidth>
              <FormControl
                fullWidth
                required
                error={!!errors.agendamento}
                helperText={errors.agendamento}
                className={`mb-3 ${isReadOnly ? "input-readonly-field" : ""}`}
              >
                <InputLabel shrink>Serviços Agendados</InputLabel>
                <Select
                  label="Serviços Agendados"
                  variant="standard"
                  value={dataForm.agendamento}
                  onChange={handleChange}
                  name="agendamento"
                  displayEmpty
                  inputProps={{ readOnly: isReadOnly }}
                >
                  <MenuItem value="">
                    <em>Escolha um agendamento</em>
                  </MenuItem>
                  {agendamentoList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.id}:
                      {/* {option.cliente.veiculos[0].veiculo.modelo} /{" "}
                      {option.cliente.veiculos[0].placaVeiculo} */}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.agendamento}</FormHelperText>
              </FormControl>

              <TextField
                label="Data de Encerramento do Serviço"
                type="date"
                name="dataEntrega"
                variant="standard"
                value={dataForm.dataEntrega}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  readOnly: isReadOnly,
                }}
                error={!!errors.dataEntrega}
                helperText={errors.dataEntrega}
                fullWidth
                className={`mb-3 `}
              />

              <FormControl fullWidth className="mb-3" variant="standard">
                <InputLabel>Forma de Pagamento</InputLabel>
                <Select
                  variant="standard"
                  name="tipoPagamento"
                  value={dataForm.tipoPagamento}
                  onChange={handleChange}
                  error={!!errors.tipoPagamento}
                  helperText={errors.tipoPagamento}
                >
                  <MenuItem value="CARTAO_DEBITO">Cartão de Débito</MenuItem>
                  <MenuItem value="CARTAO_CREDITO">Cartão de Crédito</MenuItem>
                  <MenuItem value="PIX">Pix</MenuItem>
                  <MenuItem value="DINHEIRO">Dinheiro</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                className="mb-3"
                required
                variant="standard"
              >
                <InputLabel>Valor Final</InputLabel>
                <Input
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  name="valorFinal"
                  onChange={handleChange}
                  value={dataForm.valorFinal}
                  type="number"
                  error={!!errors.valorFinal}
                  helperText={errors.valorFinal}
                />
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

            <ButtonCancel route="/encerramentos" />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default Encerramento;
