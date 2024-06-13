import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import { ListAll, DeleteById } from "../../services/funcionario/funcionarioService.js";
import { RealFormatter } from '../../utils/DataGridBase/RealFormatter.jsx';
import LoadingCircular from '../../utils/LoadingCircular.jsx';
import DataGridBase from '../../components/DataGridBase/DataGridBase.jsx';



const Funcionarios = () => {

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
      //console.log(resposta.data);
      setRows(resposta.data);
      setLoading(false)
    })();

  }, [navigate, locationUrl.state.token]);

  var columns = [
    { key: 'id', name: 'ID' },
    { key: 'nome', name: 'Nome' },
    { key: 'telefone', name: 'telefone' },
    { key: 'email', name: 'Email'},
    { key: 'salario', name: 'Salário', renderCell: (item) => RealFormatter(item.row.salario)  },
    { key: 'disponibilidade', name: 'Disponível', renderCell: (item) => item.row.disponibilidade ? 'Sim' : 'Não'}
  ]

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      {loading ? (
        <LoadingCircular text={"Carregando funcionários..."}/>
      ) : (
        <DataGridBase 
          title={"Funcionários Cadastrados"}
          data={rows}
          baseColumns={columns}
          routeAddItem={"funcionario"}
          nameExport={"funcionarios"}
          deleteMethod={async(id)=>{return await DeleteById(id)}}
        />
      )}
    </LayoutBase>
  );
};

export default Funcionarios;
