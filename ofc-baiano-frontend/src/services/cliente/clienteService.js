import { get, del, postData, putData } from '../_baseService.js';

export const ListAll = async () => {
  try {
    const result = await get('/clientes');
    return result;
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
    const result = await del(`/clientes/${id}`);
    return result;
  } 
  catch (error) {
    return {
      success: false,
      erroMsg: "Erro ao processar o pedido de exclusão",
      options: null,
      data: null,
    };
  }
};

export const GetById = async (id) => {
  try {
    const result = await get(`/clientes/${id}`);
    return result;
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
    const result = await postData('/clientes', data);
    return result;
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
    const result = await putData('/clientes', data);
    return result;
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
