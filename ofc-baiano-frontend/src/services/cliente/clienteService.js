import { get, del, postData, putData } from '../_baseService.js';

export const ListAll = async () => {
  try {
    // const result = await get('/clientes');
    // return result

    const rows = [
      {id: 1, nome: "Tião", telefone: "(99) 99999-9999", email: "tiao@exemple.com", cpf: "077.895.330-02"},
      {id: 2, nome: "Mario", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", cpf: "350.216.960-84"},
      {id: 3, nome: "Luigi", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", cpf: "700.143.170-28"},
      {id: 4, nome: "Yoshi", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", cpf: "929.539.560-34"},
    ]

    return {
      success: true,
      erroMsg: null,
      options: null,
      data: rows,
    };
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: "Erro ao processar",
      options: null,
      data: null,
    };
  }
};

export const DeleteCliente = async (id) => {
  try {

    const result = await del('/cliente',id);
    // console.log(result)
    // return result

    return {
        success: true,
        erroMsg: null,
        options: null,
        data: null
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

export const GetById = async (id) => {
  try {
    return await get('/clientes/'+id);
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: "Erro ao processar",
      options: null,
      data: null,
    };
  }
};

export const SendFormPost = async (data) => {
  try {
    return await postData('/clientes', data);
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: error,
      options: null,
      data: null,
    };
  }
};

export const SendFormPut = async (data) => {
  try {
    return await putData('/clientes', data);
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: error,
      options: null,
      data: null,
    };
  }
};