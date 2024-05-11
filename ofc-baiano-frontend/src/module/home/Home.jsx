import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import LayoutBase from "../../components/layout/LayoutBase.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import '../../style/home/style.css';


const Home = () => {

  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state.token != "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/'); 
    }
  }, [navigate]);


  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
            <h2><b>SISTEMA DE GERENCIAMENTO DE OFICINA</b></h2>
            <div className="d-flex w-100 justify-content-center img-home text-center" >
                <img className="text-center" src="../src/assets/img/Logo.png" alt="Oficina do Baiano" />
            </div>
            <p>
                Criado por Alessandro C. Santos, João Vitor Maciel Campos e Wesley Pereira
                <br/>
                Desenvolvido em 2024
            </p>
            
       
    </LayoutBase>
  );
};

export default Home;
