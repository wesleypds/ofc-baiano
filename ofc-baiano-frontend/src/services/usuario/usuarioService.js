import { get, del } from '../_baseService.js';

export const ListAll = async () => {
  try {
    const result = await get('/usuarios');
    // console.log(result)
    // return result

    const rows = [
      { id: 1, nome: 'John', usuario: "john", tipo: "Administrador", email: 'john@example.com'},
      { id: 2, nome: 'Jane', usuario: "jane", tipo: "funcionário", email: 'jane@example.com'},
      { id: 3, nome: 'Bob', usuario: "bob", tipo: "Administrador", email: 'bob@example.com'},
    ]

    return {
        success: true,
        erroMsg: null,
        options: null,
        data: rows,
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
      erroMsg: "Erro ao processar",
      options: null,
      data: null,
    };
  }
};

export const DeleteUsuario = async (id) => {
  try {

    const result = await del('/usuario',id);
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