import { get , del} from '../_baseService.js';

export const ListAll = async () => {
  try {

    const result = await get('/servicos');
    // console.log(result)
    // return result

    const rows = [
      { id: 0, nome: 'Troca de Óleo', tempoEstimado: '30 min', valor: 100.0, complexidade: "Médio" },
      { id: 1, nome: 'Alinhamento', tempoEstimado: '1 hora', valor: 150.0, complexidade: "Fácil" },
      { id: 2, nome: 'Balanceamento', tempoEstimado: '1 hora', valor: 120.0, complexidade: "Médio" },
      { id: 3, nome: 'Substituição de Pastilhas de Freio', tempoEstimado: '2 horas', valor: 200.0, complexidade: "Médio" },
      { id: 4, nome: 'Troca de Pneus', tempoEstimado: '1 hora', valor: 80.0, complexidade: "Médio" },
      { id: 5, nome: 'Reparo de Suspensão', tempoEstimado: '3 horas', valor: 300.0, complexidade: "Difícil" },
      { id: 6, nome: 'Limpeza de Bicos Injetores', tempoEstimado: '1 hora', valor: 150.0, complexidade: "Médio" },
      { id: 7, nome: 'Troca de Filtros de Ar', tempoEstimado: '45 min', valor: 70.0, complexidade: "Fácil" },
      { id: 8, nome: 'Revisão Completa', tempoEstimado: '5 horas', valor: 500.0, complexidade: "Médio" },
      { id: 9, nome: 'Troca de Bateria', tempoEstimado: '30 min', valor: 180.0, complexidade: "Fácil" },
      { id: 10, nome: 'Reparação de Motor', tempoEstimado: '8 horas', valor: 1000.0, complexidade: "Médio" },
      { id: 11, nome: 'Troca de Velas de Ignição', tempoEstimado: '1 hora', valor: 120.0, complexidade: "Médio" },
      { id: 12, nome: 'Reparo de Caixa de Direção', tempoEstimado: '4 horas', valor: 400.0, complexidade: "Difícil" },
      { id: 13, nome: 'Substituição de Correia Dentada', tempoEstimado: '3 horas', valor: 350.0, complexidade: "Difícil" },
      { id: 14, nome: 'Troca de Amortecedores', tempoEstimado: '2 horas', valor: 250.0, complexidade: "Médio" },
      { id: 15, nome: 'Reparo de Sistema de Arrefecimento', tempoEstimado: '3 horas', valor: 300.0, complexidade: "Fácil" },
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


