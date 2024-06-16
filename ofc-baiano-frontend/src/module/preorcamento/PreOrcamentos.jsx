import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/preorcamento/preOrcamentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { IconButton } from '@mui/material';
import { DollarCircleOutlined } from '@ant-design/icons';


const PreOrcamentos = () => {
  
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locationUrl.state.token !== "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate("/");
    }

    (async () => {
      var resposta = await ListAll();
      setRows(resposta.data);
      setLoading(false);
    })();
  }, [navigate, locationUrl.state.token]);

  var columns = [
    { key: "id", name: "ID" },
    { key: "escolha", name: "Tipo"},
    { key: "cliente", name: "Cliente"},
    { key: "problema", name: "Problema" },
  ];

  const addOrcamento = (id) => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(`/veiculo-cliente/${id}`, { state: { token, userInfo } });
  };

  const renderAddOrcamentoButton = (id) => (
    <IconButton onClick={() => addOrcamento(id)}>
      <DollarCircleOutlined style={{ color: "#3543c4" }} />
    </IconButton>
  );

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando pré-Orçamentos..."} />
      ) : (
        <DataGridBase
          title={"Pré-Orçamentos Cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"preorcamento"}
          nameExport={"preorcamentos"}
          deleteMethod={async(id)=>{return await DeleteById(id)}}
          additionalButton={renderAddOrcamentoButton}
        />
      )}
    </LayoutBase>
  );
};

export default PreOrcamentos;
