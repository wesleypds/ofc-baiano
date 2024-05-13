import { get , del} from '../_baseService.js';

export const ListAll = async () => {
  try {

    const result = await get('/servicos');
    // console.log(result)
    // return result

    const rows = [
      { id: 0, nome: 'Troca de Óleo', tipo: 'Serviço', tempoEstimado: '30 min', valor: 100.0, complexidade: 1 },
      { id: 1, nome: 'Alinhamento', tipo: 'Serviço', tempoEstimado: '1 hora', valor: 150.0, complexidade: 2 },
      { id: 2, nome: 'Balanceamento', tipo: 'Serviço', tempoEstimado: '1 hora', valor: 120.0, complexidade: 2 },
      { id: 3, nome: 'Substituição de Pastilhas de Freio', tipo: 'Serviço', tempoEstimado: '2 horas', valor: 200.0, complexidade: 3 },
      { id: 4, nome: 'Troca de Pneus', tipo: 'Serviço', tempoEstimado: '1 hora', valor: 80.0, complexidade: 2 },
      { id: 5, nome: 'Reparo de Suspensão', tipo: 'Serviço', tempoEstimado: '3 horas', valor: 300.0, complexidade: 4 },
      { id: 6, nome: 'Limpeza de Bicos Injetores', tipo: 'Serviço', tempoEstimado: '1 hora', valor: 150.0, complexidade: 2 },
      { id: 7, nome: 'Troca de Filtros de Ar', tipo: 'Serviço', tempoEstimado: '45 min', valor: 70.0, complexidade: 1 },
      { id: 8, nome: 'Revisão Completa', tipo: 'Serviço', tempoEstimado: '5 horas', valor: 500.0, complexidade: 5 },
      { id: 9, nome: 'Troca de Bateria', tipo: 'Serviço', tempoEstimado: '30 min', valor: 180.0, complexidade: 1 },
      { id: 10, nome: 'Reparação de Motor', tipo: 'Serviço', tempoEstimado: '8 horas', valor: 1000.0, complexidade: 5 },
      { id: 11, nome: 'Troca de Velas de Ignição', tipo: 'Serviço', tempoEstimado: '1 hora', valor: 120.0, complexidade: 2 },
      { id: 12, nome: 'Reparo de Caixa de Direção', tipo: 'Serviço', tempoEstimado: '4 horas', valor: 400.0, complexidade: 4 },
      { id: 13, nome: 'Substituição de Correia Dentada', tipo: 'Serviço', tempoEstimado: '3 horas', valor: 350.0, complexidade: 4 },
      { id: 14, nome: 'Troca de Amortecedores', tipo: 'Serviço', tempoEstimado: '2 horas', valor: 250.0, complexidade: 3 },
      { id: 15, nome: 'Reparo de Sistema de Arrefecimento', tipo: 'Serviço', tempoEstimado: '3 horas', valor: 300.0, complexidade: 4 },
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

export const DeleteServico = async (id) => {
  try {

    const result = await del('/servico',id);
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


