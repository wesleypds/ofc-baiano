import React, { useState, useEffect  } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/encerramento/encerramentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';

const Encerramentos = () => {
  
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  var columns = [
    { key: "id", name: "ID" },
    { key: "dataEntrega", name: "Data de Entrega"},
    { key: "tipoPagamento", name: "Forma de Pagamento"},
    { key: "valorFinal", name: "Valor Total", renderCell: (item) => RealFormatter(item.row.valorFinal) }
  ];

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




  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando Encerramentos..."} />
      ) : (

          <DataGridBase
            title={"Encerramentos Cadastrados"}
            data={rows}
            baseColumns={columns}
            routeAddItem={"encerramento"}
            nameExport={"encerramento"}
            deleteMethod={async (id) => { return await DeleteById(id) }}
          />
      )}
    </LayoutBase>
  );
};

export default Encerramentos;
