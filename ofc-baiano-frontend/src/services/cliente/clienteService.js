
import { get, del, postData, putData } from '../_baseService.js';

export const ListAll = async () => {
  try {
    const result = await get('/clientes');
    return result
  } 
  catch (error) {
    return {
      success: false,
      errorMsg: "Erro ao processar",
      options: null,
      data: null,
    };
  }
};

export const DeleteById = async (id) => {
  try {
    const result = await del('/clientes',id);
    return result
  } 
  catch (error) {
    return {
      success: false,
      errorMsg: "Erro ao processar a exclusão",
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
      errorMsg: error,
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
      errorMsg: error,
      options: null,
      data: null,
    };
  }
};