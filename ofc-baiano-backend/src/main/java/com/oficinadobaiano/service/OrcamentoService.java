package com.oficinadobaiano.service;

import java.util.Optional;
import java.util.List;

import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;

public interface OrcamentoService {
    Orcamento save(Orcamento orcamento) throws MensagemValidacao;

    List<Orcamento> findAll();

    Optional<Orcamento> findById(Long id);

    Orcamento update(Orcamento orcamento);

    void remove(Long id);
}
