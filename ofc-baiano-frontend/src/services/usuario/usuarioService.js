import { get, del, postData, putData } from '../_baseService.js';

export const ListAll = async () => {
  try {
    const result = await get('/usuarios');
    return result
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

export const DeleteUsuario = async (id) => {
  try {
    const result = await del('/usuarios',id);
    return result
  } 
  catch (error) {
    console.error(error)
    return {
      success: false,
      erroMsg: "Erro ao processar a exclusão",
      options: null,
      data: null,
    };
  }
};

export const GetById = async (id) => {
  try {
    return await get('/usuarios/'+id);
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
    return await postData('/usuarios', data);
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
    return await putData('/usuarios', data);
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