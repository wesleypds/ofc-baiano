package com.oficinadobaiano.service.impl;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.repository.OrcamentoRepository;
import com.oficinadobaiano.service.OrcamentoService;

@Service
public class OrcamentoServiceImpl implements OrcamentoService {
    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Override
    public Orcamento save(Orcamento orcamento) {
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
        return orcamentoRepository.save(orcamento);
    }

    @Override
    public void remove(Long id) {
        orcamentoRepository.deleteById(id);
    }
}
