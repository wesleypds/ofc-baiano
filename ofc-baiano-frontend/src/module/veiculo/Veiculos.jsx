import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";

import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import {RealFormatter} from '../../utils/DataGridBase/RealFormatter.jsx';
import {DeleteVeiculo, ListAll} from "../../services/veiculo/veiculoService.js"
import LoadingCircular from '../../utils/LoadingCircular.jsx';

const Usuario = () => {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const locationUrl = useLocation();
  const navigate = useNavigate();

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
    { key: 'marca', name: 'Marca' },
    { key: 'modelo', name: 'Modelo' },
    { key: 'cor', name: 'Cor' }
  ]

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando veículos..."}/>
      ) : (
        <DataGridBase
          title={"Veículos cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"veiculo"}
          nameExport={"veiculos"}
          deleteMethod={async()=>{return await DeleteVeiculo()}}
        />
      )}
    </LayoutBase>
  );
};

export default Usuario;