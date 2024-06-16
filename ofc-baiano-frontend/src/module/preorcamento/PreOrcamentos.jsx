import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/preorcamento/preOrcamentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';


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
        />
      )}
    </LayoutBase>
  );
};

export default PreOrcamentos;
