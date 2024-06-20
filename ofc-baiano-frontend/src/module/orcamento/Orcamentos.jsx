import React, { useState, useEffect, useCallback  } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById, GetById, SendFormPut } from "../../services/orcamento/orcamentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { CheckCircleOutlined} from '@ant-design/icons';
import {IconButton } from '@mui/material';


const Orcamentos = () => {
  
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  var columns = [
    { key: "id", name: "ID" },
    { key: "cliente", name: "Cliente", renderCell: ({row}) => row.cliente.nome },
    { key: "problema_mecanico", name: "Problema", renderCell: ({row}) => row.problemaMecanico },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    var resposta = await ListAll();
    var filteredData = resposta.data.filter(item => item.aprovado === false || item.aprovado === false ||  item.aprovado===null);
    setRows(filteredData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (locationUrl.state.token !== "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }

    (async () => {
      var resposta = await ListAll();
      var filteredData = resposta.data.filter(item => item.aprovado === false ||  item.aprovado===null);
      setRows(filteredData);
      setLoading(false);
    })();
  }, [navigate, locationUrl.state.token]);

  
  const handleAprovarOrcamentoClient = (id) => {
    (async () => {
      var resposta = await GetById(id);
      resposta.data.aprovado = true;
      var response = await SendFormPut(resposta.data)

      if(response.success){
        fetchData()
      }
      else{
        console.log("Não alterado")
      }

    })();
  };

  const renderAprovarOrcamentoButton = (id) => (
    <IconButton onClick={() => handleAprovarOrcamentoClient(id)}>
      <CheckCircleOutlined  style={{ color: "#3543c4" }} />
    </IconButton>
  );

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando Orçamentos..."} />
      ) : (

          <DataGridBase
            title={"Orçamentos Cadastrados"}
            data={rows}
            baseColumns={columns}
            routeAddItem={"orcamento"}
            nameExport={"orcamentos"}
            deleteMethod={async (id) => { return await DeleteById(id) }}
            additionalButton={renderAprovarOrcamentoButton}
          />
        

      )}
    </LayoutBase>
  );
};

export default Orcamentos;
