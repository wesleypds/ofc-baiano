import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LayoutBase from '../../components/layout/LayoutBase.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';
import {RealFormatter} from '../../utils/DataGridBase/RealFormatter.jsx';
import {DeleteProduto, ListAll} from "../../services/produto/produtoService.js"
import LoadingCircular from '../../utils/LoadingCircular.jsx';

const Produtos = () => {

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
    { key: 'codigo', name: 'Código' },
    { key: 'nome', name: 'Nome' },
    { key: 'quantidade', name: 'Quantidade' },
    { key: 'valor', name: 'Valor unitário', renderCell: RealFormatter },
  ]

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando produtos..."}/>
      ) : (
        <DataGridBase
          title={"Produtos cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"produto"}
          nameExport={"produtos"}
          deleteMethod={async()=>{return await DeleteProduto()}}
        />
      )}
    </LayoutBase>
  );
};

export default Produtos;
