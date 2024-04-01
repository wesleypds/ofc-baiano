package com.oficinadobaiano.service;

import java.util.Optional;
import java.util.List;

import com.oficinadobaiano.model.Orcamento;

public interface OrcamentoService {
    Orcamento save(Orcamento orcamento);

    List<Orcamento> findAll();

    Optional<Orcamento> findById(Long id);

    Orcamento update(Orcamento orcamento);

    void remove(Long id);
}
