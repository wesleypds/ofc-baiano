import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/agendamento/agendamentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { CheckCircleOutlined} from '@ant-design/icons';
import { IconButton } from '@mui/material';

const Agendamentos = () => {
  
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  var columns = [
    { key: "id", name: "ID" },
    { key: "inicioServico", name: "Data de Inicio"},
    { key: "funcionario", name: "Mecânico Responsável", renderCell: ({row}) => row.funcionario.nome },
    // { key: "finalizado", name: "Finalizado", renderCell: ({row}) => renderAprovarAgendamentoButton(row.id)}
  ];

  useEffect(() => {
    if (locationUrl.state.token !== "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }

    (async () => {
      var resposta = await ListAll();
      console.log(resposta.data)
      setRows(resposta.data);
      setLoading(false);
    })();
  }, [navigate, locationUrl.state.token]);


  const renderAprovarAgendamentoButton = (id) => (
    <IconButton onClick={() => handleAprovarOrcamentoClient(id)}>
      <CheckCircleOutlined  style={{ color: "#3543c4" }} />
    </IconButton>
  );

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando Agendamentos..."} />
      ) : (

          <DataGridBase
            title={"Agendamentos Cadastrados"}
            data={rows}
            baseColumns={columns}
            routeAddItem={"agendamento"}
            nameExport={"agendamento"}
            deleteMethod={async (id) => { return await DeleteById(id) }}
            additionalButton={renderAprovarAgendamentoButton}
          />
        

      )}
    </LayoutBase>
  );
};

export default Agendamentos;
