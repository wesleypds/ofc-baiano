import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import LayoutBase from "../../components/layout/LayoutBase.jsx";
import { ListAll, DeleteById } from "../../services/cliente/clienteService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { IconButton } from '@mui/material';
import { CarOutlined} from '@ant-design/icons';

const Clientes = () => {
  
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
    { key: "id", name: "ID", width: 40 },
    { key: "cpf", name: "CPF"},
    { key: "nome", name: "Nome" },
    { key: "endereco", name: "Endereço" },
    { key: "telefone", name: "Telefone" },
    { key: "email", name: "Email" },
  ];

  const addCarInClient = (id) => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(`/veiculos-cliente/${id}`, { state: { token, userInfo } });
  };

  const renderAddCarButton = (id) => (
    <IconButton onClick={() => addCarInClient(id)}>
      <CarOutlined style={{ color: "#3543c4" }} />
    </IconButton>
  );

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando clientes..."} />
      ) : (
        <DataGridBase
          title={"Clientes Cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"cliente"}
          nameExport={"clientes"}
          deleteMethod={async(id)=>{return await DeleteById(id)}}
          additionalButton={renderAddCarButton}
        />
      )}
    </LayoutBase>
  );
};

export default Clientes;
