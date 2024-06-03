import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import { ListAll, DeleteUsuario } from "../../services/usuario/usuarioService.js";

const Usuario = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locationUrl.state.token !== "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/');
    }

    (async() =>{
      var resposta = await ListAll();
      setRows(resposta.data);
      setLoading(false)
    })();

  }, [navigate, locationUrl.state.token]);

  var columns = [
    { key: 'id', name: 'ID' },
    { key: 'nome', name: 'Nome' },
    { key: 'usuario', name: 'Usuário' },
    { key: 'tipo', name: 'Tipo'},
    { key: 'email', name: 'Email'},
  ]

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando usuários..."}/>
      ) : (
        <DataGridBase 
          title={"Usuários Cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"usuario"}
          nameExport={"usuarios"}
          deleteMethod={async(id)=>{return await DeleteUsuario(id)}}
        />
      )}
    </LayoutBase>
  );
};

export default Usuario;