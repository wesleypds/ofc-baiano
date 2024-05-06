import { getByParams } from '../_baseService.js';

export const CheckAccesslogin = async (username, password) => {
  try {
    const result = await getByParams('/login',{ username: username, password: password});
    // console.log(result)
    // return result

    return {
        success: true,
        erroMsg: null,
        options: {token: "7f08f0ae81840a4a1887d3bdf9201efb"},
        data: {id:"156456456", name:"Alessandro C. Santos", userName:"alessandro", tipo: "admin", email: "santos@gmail.com"},
    };

    return {
        success: false,
        erroMsg: "login inválido",
        options: null,
        data: null,
    };
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