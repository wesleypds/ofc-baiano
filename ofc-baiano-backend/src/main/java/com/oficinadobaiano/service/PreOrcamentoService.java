package com.oficinadobaiano.service;

import java.util.*;

import com.oficinadobaiano.model.PreOrcamento;

public interface PreOrcamentoService {
    PreOrcamento save(PreOrcamento preOrcamento);

    List<PreOrcamento> findAll();

    Optional<PreOrcamento> findById(Long id);

    PreOrcamento update(PreOrcamento preOrcamento);

    void remove(Long id);
}
