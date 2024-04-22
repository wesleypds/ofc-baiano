package com.oficinadobaiano.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.enums.EscolhaCliente;
import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.ClienteRepository;
import com.oficinadobaiano.repository.PreOrcamentoRepository;
import com.oficinadobaiano.service.PreOrcamentoService;

@Service
public class PreOrcamentoServiceImpl implements PreOrcamentoService {

    @Autowired
    private PreOrcamentoRepository preOrcamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public PreOrcamento save(PreOrcamento preOrcamento) throws MensagemValidacao {
        if (preOrcamento.getEscolha().equals(EscolhaCliente.ORCAMENTO)) {
            preOrcamento.setProblema(null);
        }
        Optional<Cliente> cliente = clienteRepository.findById(preOrcamento.getCliente().getId());
        cliente.get().setVeiculos(preOrcamento.getCliente().getVeiculos());
        cliente.get().setOrcamento(true);
        Cliente c = clienteRepository.save(cliente.get());
        preOrcamento.setCliente(c);
        saveValidation(preOrcamento);
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

    private void saveValidation(PreOrcamento preOrcamento) throws MensagemValidacao {
        PreOrcamento db = preOrcamentoRepository.findByCliente(preOrcamento.getCliente());

        if (db != null) {
            throw new MensagemValidacao("Este cliente já está em um Pré Orçamento");
        }

        if (preOrcamento.getCliente().getVeiculos() == null || preOrcamento.getCliente().getVeiculos().size() == 0) {
            throw new MensagemValidacao("É preciso ter pelo menos 1 veículo em cliente");
        }

        if (preOrcamento.getEscolha().equals(EscolhaCliente.ORCAMENTO_E_SERVICO) || preOrcamento.getEscolha().equals(EscolhaCliente.SERVICO)) {
            if (preOrcamento.getProblema() == null) {
                throw new MensagemValidacao("O campo Problema Relatado precisa estar preenchido");
            }
        }
    }
}
