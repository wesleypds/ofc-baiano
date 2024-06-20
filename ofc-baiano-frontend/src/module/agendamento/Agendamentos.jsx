import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/agendamento/agendamentoService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { parseISO, format } from "date-fns";

const Agendamentos = () => {
  
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


  var columns = [
    { key: "id", name: "ID", width:40 },
    { key: "orcamento", name: "Orçamento", renderCell: ({row}) => row.orcamento.cliente.id + ": " + row.orcamento.cliente.veiculos[0].veiculo.modelo + " / " + row.orcamento.cliente.veiculos[0].placaVeiculo}  ,
    { key: "inicioServico", name: "Data de Inicio", renderCell: ({row}) => format(parseISO(row.inicioServico), "dd/MM/yyyy") },
    { key: "funcionario", name: "Mecânico Responsável", renderCell: ({row}) => row.funcionario.nome },
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
        <LoadingCircular text={"Carregando Agendamentos..."} />
      ) : (

          <DataGridBase
            title={"Agendamentos Cadastrados"}
            data={rows}
            baseColumns={columns}
            routeAddItem={"agendamento"}
            nameExport={"agendamento"}
            deleteMethod={async (id) => { return await DeleteById(id) }}
          />
        

      )}
    </LayoutBase>
  );
};

export default Agendamentos;
