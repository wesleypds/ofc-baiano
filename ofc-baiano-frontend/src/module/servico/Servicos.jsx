import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { ListAll, DeleteServico } from '../../services/servico/servicoService.js';
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import {RealFormatter} from '../../utils/DataGridBase/RealFormatter.jsx';

const Servicos = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }

    (async() =>{
      var resposta = await ListAll();
      setRows(resposta.data);
      setLoading(false)
    })();

  }, [navigate]);

  var columns = [
    { key: 'id', name: 'ID' },
    { key: 'nome', name: 'Nome' },
    { key: 'tipo', name: 'Tipo' },
    { key: 'tempoEstimado', name: 'Tempo Estimado' },
    { key: 'valor', name: 'Valor',  },
    { key: 'complexidade', name: 'Complexidade', renderCell: RealFormatter },
  ]

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando serviços..."}/>
      ) : (
        <DataGridBase
          title={"Serviços cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"servico"}
          nameExport={"servicos"}
          deleteMethod={async()=>{return await DeleteServico()}}
        />
      )}
    </LayoutBase>
  );
};

export default Servicos;
