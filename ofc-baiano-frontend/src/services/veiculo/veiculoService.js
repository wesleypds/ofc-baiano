import { get , del} from '../_baseService.js';

export const ListAll = async () => {
  try {

    const result = await get('/veiculos');
    // console.log(result)
    // return result

    const rows = [
      { id: 0, marca: 'Toyota', modelo: 'Corolla', cor: 'Prata' },
      { id: 1, marca: 'Honda', modelo: 'Civic', cor: 'Preto' },
      { id: 2, marca: 'Ford', modelo: 'Fiesta', cor: 'Azul' },
      { id: 3, marca: 'Chevrolet', modelo: 'Onix', cor: 'Branco' },
      { id: 4, marca: 'Volkswagen', modelo: 'Golf', cor: 'Vermelho' },
      { id: 5, marca: 'Fiat', modelo: 'Punto', cor: 'Cinza' },
      { id: 6, marca: 'Hyundai', modelo: 'HB20', cor: 'Prata' },
      { id: 7, marca: 'Nissan', modelo: 'Sentra', cor: 'Preto' },
      { id: 8, marca: 'Renault', modelo: 'Clio', cor: 'Azul' },
      { id: 9, marca: 'Peugeot', modelo: '208', cor: 'Branco' },
      { id: 10, marca: 'Citroën', modelo: 'C3', cor: 'Vermelho' },
      { id: 11, marca: 'Mitsubishi', modelo: 'Lancer', cor: 'Cinza' },
      { id: 12, marca: 'Subaru', modelo: 'Impreza', cor: 'Prata' },
      { id: 13, marca: 'Mazda', modelo: '3', cor: 'Preto' },
      { id: 14, marca: 'BMW', modelo: '320i', cor: 'Azul' },
      { id: 15, marca: 'Mercedes-Benz', modelo: 'C200', cor: 'Branco' },
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

export const DeleteVeiculo= async (id) => {
  try {

    const result = await del('/veiculo',id);
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


