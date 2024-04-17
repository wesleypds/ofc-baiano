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
        Optional<Cliente> cliente = clienteRepository.findById(preOrcamento.getCliente().getId());
        cliente.get().setVeiculos(preOrcamento.getCliente().getVeiculos());

        Cliente c = clienteRepository.save(cliente.get());

        if (c.getVeiculos() == null || c.getVeiculos().size() == 0) {
            throw new MensagemValidacao("É preciso ter pelo menos 1 veículo em cliente");
        }

        preOrcamento.setCliente(c);

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
