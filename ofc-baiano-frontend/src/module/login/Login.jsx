import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { CheckAccesslogin } from '../../services/auth/authService.js';


import CenteredContainer from "../../components/CenteredContainer.jsx";
import NotImplemented from "../../components/NotImplemented.jsx"

import "../../style/login/Login.css"

const Login= () => {

  const locationUrl = useLocation();
  const navigate = useNavigate(); 

  const [showNotImplementedModal, setShowNotImplementedModal] = useState(false);

  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');

  const [isValiduserName, setIsValiduserName] = useState(true);
  const [isValidPassWorld, setIsValidPassWorld] = useState(true);

  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [invalidLoginMsg, setInvalidLoginMsg] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleuserNameChange = (event) => {
    setuserName(event.target.value);
  };

  const handleLogin = async () => {
    if(checkValidLogin(userName, password))
    {
      const res = await CheckAccesslogin(userName,password);

      if(res.success)
      {
        const token  = res.options?.token;
        const userInfo = res.data
        navigate('/home', { state: { token,  userInfo }});
      }
      
      setIsInvalidLogin(true);
      setInvalidLoginMsg(res.errorMsg);
    }
  };

  
  const checkValidLogin = (userName, password) => {

    setIsValiduserName(true)
    setIsValidPassWorld(true)

    if(userName == ""){
      setIsInvalidLogin(true);
      setInvalidLoginMsg("Insira seu usuário");
      setIsValiduserName(false)
      return false;
    }else if(password == ""){
      setIsInvalidLogin(true);
      setInvalidLoginMsg("Insira sua senha");
      setIsValidPassWorld(false)
      return false;
    }
    return true;
  };



  const closeModalNotImplemented = () => {
    setShowNotImplementedModal(false);
  };


  const openModalNotImplemented = () => {
    setShowNotImplementedModal(true);
  };


  return (
    <CenteredContainer>
      <NotImplemented active={showNotImplementedModal} onClose={closeModalNotImplemented}/>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={500} className="container-login">
        <Box>
            <img width={240} src="src/assets/img/Logo.png" alt="Oficina do Baiano" />
        </Box>
        <TextField 
          label="Usuário" 
          variant="filled" 
          onChange={handleuserNameChange}
          error={!isValiduserName}
          value={userName} 
          fullWidth 
        />

        <TextField 
          label="Senha" 
          variant="filled" 
          type="password"
          value={password} 
          onChange={handlePasswordChange} 
          error={!isValidPassWorld}
          fullWidth 
        />

        <Button variant="text" color="primary" onClick={openModalNotImplemented} className='button-back-forget-passworld' >
            Esqueci a senha
        </Button>
        {isInvalidLogin && (
            <Box className={`user-disabled`}>
                <center>{invalidLoginMsg}</center>
            </Box>
        )}
        <Box className='group-button-login'>
          <Button variant="contained" color="primary" onClick={handleLogin} className='button-login'>
            Login
          </Button>
          <Button variant="contained"  color="error" onClick={openModalNotImplemented} className='button-login'>
            Solicitar acesso
          </Button>
        </Box>
      </Box>

    </CenteredContainer>
  );
};

export default Login;
