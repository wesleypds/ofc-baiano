package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Servico;

public interface ServicoService {
    Servico save(Servico servico);

    List<Servico> findAll();

    Optional<Servico> findById(Long id);

    Servico update(Servico servico);

    void remove(Long id);
}
