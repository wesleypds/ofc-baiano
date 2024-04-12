package com.oficinadobaiano.service;

import java.util.*;

import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;

public interface PreOrcamentoService {
    PreOrcamento save(PreOrcamento preOrcamento) throws MensagemValidacao;

    List<PreOrcamento> findAll();

    Optional<PreOrcamento> findById(Long id);

    PreOrcamento update(PreOrcamento preOrcamento);

    void remove(Long id);
}
