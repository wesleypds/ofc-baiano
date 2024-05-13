import { get , del} from '../_baseService.js';

export const ListAll = async () => {
  try {

    const result = await get('/produtos');
    // console.log(result)
    // return result

    const rows = [
      { id: 0, nome: 'Chave de Fenda', codigo: 'CF001', quantidade: 15, valor: 10.0 },
      { id: 1, nome: 'Martelo', codigo: 'MT002', quantidade: 25, valor: 20.0 },
      { id: 2, nome: 'Alicate', codigo: 'AL003', quantidade: 30, valor: 18.0 },
      { id: 3, nome: 'Parafuso', codigo: 'PF004', quantidade: 100, valor: 0.5 },
      { id: 4, nome: 'Porca', codigo: 'PC005', quantidade: 200, valor: 0.3 },
      { id: 5, nome: 'Prego', codigo: 'PR006', quantidade: 500, valor: 0.1 },
      { id: 6, nome: 'Serra', codigo: 'SR007', quantidade: 10, valor: 25.0 },
      { id: 7, nome: 'Furadeira', codigo: 'FR008', quantidade: 5, valor: 150.0 },
      { id: 8, nome: 'Chave Inglesa', codigo: 'CI009', quantidade: 20, valor: 12.0 },
      { id: 9, nome: 'Broca', codigo: 'BR010', quantidade: 50, valor: 2.0 },
      { id: 10, nome: 'Lima', codigo: 'LM011', quantidade: 18, valor: 8.0 },
      { id: 11, nome: 'Arco de Serra', codigo: 'AS012', quantidade: 7, valor: 30.0 },
      { id: 12, nome: 'Trena', codigo: 'TR013', quantidade: 22, valor: 15.0 },
      { id: 13, nome: 'Esquadro', codigo: 'ES014', quantidade: 17, valor: 10.0 },
      { id: 14, nome: 'Nível', codigo: 'NV015', quantidade: 12, valor: 20.0 },
      { id: 15, nome: 'Cortador de Tubos', codigo: 'CT016', quantidade: 9, valor: 50.0 },
    ];

    return {
        success: true,
        erroMsg: null,
        options: null,
        data: rows
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

export const DeleteProduto = async (id) => {
  try {

    const result = await del('/produtos',id);
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


