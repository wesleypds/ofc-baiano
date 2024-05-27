import { getByParams } from '../_baseService.js';

export const CheckAccesslogin = async (username, password) => {
  try {
    return  await getByParams('/usuarios/autenticacao',{ usuario: username, senha: password});
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: "Erro ao processar o login",
      options: null,
      data: null,
    };
  }
};

export default CheckAccesslogin;