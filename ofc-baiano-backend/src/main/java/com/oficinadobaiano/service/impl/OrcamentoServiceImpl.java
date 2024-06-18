package com.oficinadobaiano.service.impl;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.enums.EscolhaCliente;
import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.model.OrcamentoProduto;
import com.oficinadobaiano.model.OrcamentoServico;
import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.Produto;
import com.oficinadobaiano.model.Servico;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.OrcamentoRepository;
import com.oficinadobaiano.repository.PreOrcamentoRepository;
import com.oficinadobaiano.repository.ProdutoRepository;
import com.oficinadobaiano.repository.ServicoRepository;
import com.oficinadobaiano.service.OrcamentoService;

@Service
public class OrcamentoServiceImpl implements OrcamentoService {
    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Autowired
    private PreOrcamentoRepository preOrcamentoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public Orcamento save(Orcamento orcamento) throws MensagemValidacao {
        saveValidation(orcamento);
        trataEscolhaCliente(orcamento);
        orcamento.setValor(calculaValorOrcamento(orcamento));
        return orcamentoRepository.save(orcamento);
    }

    @Override
    public List<Orcamento> findAll() {
        return orcamentoRepository.findAll();
    }

    @Override
    public Optional<Orcamento> findById(Long id) {
        return orcamentoRepository.findById(id);
    }

    @Override
    public Orcamento update(Orcamento orcamento) {
        orcamento.setValor(calculaValorOrcamento(orcamento));
        return orcamentoRepository.save(orcamento);
    }

    @Override
    public void remove(Long id) {
        orcamentoRepository.deleteById(id);
    }

    private void trataEscolhaCliente(Orcamento orcamento) {
        Optional<PreOrcamento> db = preOrcamentoRepository.findById(orcamento.getPreOrcamento().getId());
        PreOrcamento preOrcamento = db.get();
        if (preOrcamento.getEscolha().equals(EscolhaCliente.ORCAMENTO_E_SERVICO) || preOrcamento.getEscolha().equals(EscolhaCliente.SERVICO)) {
            orcamento.setProblemaCliente(preOrcamento.getProblema());
        }

        if (preOrcamento.getEscolha().equals(EscolhaCliente.SERVICO)) {
            orcamento.setAprovado(true);
            orcamento.setProblemaMecanico(null);
        }
    }

    private void saveValidation(Orcamento orcamento) throws MensagemValidacao {
        Orcamento db = orcamentoRepository.findByPreOrcamento(orcamento.getPreOrcamento());
        if (db != null && db.getFinalizado().equals(false)) {
            throw new MensagemValidacao("Já existe um orçamento para este cliente.");
        }
    }

    private Double calculaValorOrcamento(Orcamento orcamento) {
        Double valor = 0.0;
        Optional<Orcamento> dbOrcamento;
        Orcamento orc;

        if (orcamento.getId() != null) {
            dbOrcamento = orcamentoRepository.findById(orcamento.getId());
            orc = dbOrcamento.get();
            if (orc != null) {
                valor = orc.getValor();
            }
        }

        if (orcamento.getServicos() != null) {
            for (OrcamentoServico orcamentoServico : orcamento.getServicos()) {
                if (orcamentoServico.getId() == null) {
                    Optional<Servico> db = servicoRepository.findById(orcamentoServico.getServico().getId());
                    Servico servico = db.get();
                    valor += servico.getValor();
                }
            }
        }

        if (orcamento.getProdutoOrcamentos() != null) {
            for (OrcamentoProduto orcamentoProduto : orcamento.getProdutoOrcamentos()) {
                if (orcamentoProduto.getId() == null) {
                    Optional<Produto> db = produtoRepository.findById(orcamentoProduto.getProduto().getId());
                    Produto produto = db.get();
                    Double valorTotalProduto = produto.getValor() * orcamentoProduto.getQuantidade();
                    valor += valorTotalProduto;
                }
            }
        }

        return valor;
    }
}
