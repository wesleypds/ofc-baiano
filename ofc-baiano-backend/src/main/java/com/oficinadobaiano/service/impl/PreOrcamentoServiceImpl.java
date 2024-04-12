package com.oficinadobaiano.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.enums.EscolhaCliente;
import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.PreOrcamentoRepository;
import com.oficinadobaiano.service.PreOrcamentoService;

@Service
public class PreOrcamentoServiceImpl implements PreOrcamentoService {

    @Autowired
    private PreOrcamentoRepository preOrcamentoRepository;

    @Override
    public PreOrcamento save(PreOrcamento preOrcamento) throws MensagemValidacao {
        if (preOrcamento.getEscolha().equals(EscolhaCliente.ORCAMENTO)) {
            preOrcamento.setProblema(null);
        }
        
        if (preOrcamento.getEscolha().equals(EscolhaCliente.ORCAMENTO_E_SERVICO) || preOrcamento.getEscolha().equals(EscolhaCliente.SERVICO)) {
            if (preOrcamento.getProblema() == null) {
                throw new MensagemValidacao("O campo Problema Relatado precisa estar preenchido");
            }
        }
        return preOrcamentoRepository.save(preOrcamento);
    }

    @Override
    public List<PreOrcamento> findAll() {
        return preOrcamentoRepository.findAll();
    }

    @Override
    public Optional<PreOrcamento> findById(Long id) {
        return preOrcamentoRepository.findById(id);
    }

    @Override
    public PreOrcamento update(PreOrcamento preOrcamento) {
        return preOrcamentoRepository.save(preOrcamento);
    }

    @Override
    public void remove(Long id) {
        preOrcamentoRepository.deleteById(id);
    }

}
