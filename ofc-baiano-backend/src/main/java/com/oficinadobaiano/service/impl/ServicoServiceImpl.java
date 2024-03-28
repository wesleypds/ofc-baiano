package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Servico;
import com.oficinadobaiano.repository.ServicoRepository;
import com.oficinadobaiano.service.ServicoService;

@Service
public class ServicoServiceImpl implements ServicoService {
    @Autowired
    private ServicoRepository servicoRepository;

    @Override
    public Servico save(Servico servico) {
        return servicoRepository.save(servico);
    }

    @Override
    public List<Servico> findAll() {
        return servicoRepository.findAll();
    }

    @Override
    public Optional<Servico> findById(Long id) {
        return servicoRepository.findById(id);
    }

    @Override
    public Servico update(Servico servico) {
        return servicoRepository.save(servico);
    }

    @Override
    public void remove(Long id) {
        servicoRepository.deleteById(id);
    }
}
