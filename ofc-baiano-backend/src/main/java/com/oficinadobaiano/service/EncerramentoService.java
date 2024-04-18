package com.oficinadobaiano.service;

import java.util.*;

import com.oficinadobaiano.model.Encerramento;

public interface EncerramentoService {
    Encerramento save(Encerramento encerramento);

    List<Encerramento> findAll();

    Optional<Encerramento> findById(Long id);

    Encerramento update(Encerramento encerramento);

    void remove(Long id);
}
