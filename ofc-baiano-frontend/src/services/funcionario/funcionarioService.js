import { get, del } from '../_baseService.js';

export const ListAll = async () => {
  try {
    const result = await get('/funcionarios');
    // console.log(result)
    // return result

    const rows = [
      {id: 1, nome: "Tião", telefone: "(99) 99999-9999", email: "tiao@exemple.com", salario: 500.0, disponibilidade: "Sim"},
      {id: 2, nome: "Mario", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", salario: 500.00, disponibilidade: "Sim"},
      {id: 3, nome: "Luigi", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", salario: 500, disponibilidade: "Sim"},
      {id: 4, nome: "Yoshi", telefone: "(99) 99999-9999", email: "XXXXXXXXXXXXXXXXX", salario: 500.00, disponibilidade: "Sim"},
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

export const DeleteFuncionario = async (id) => {
  try {

    const result = await del('/funcionario',id);
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