package com.oficinadobaiano.service;

import java.util.*;

import com.oficinadobaiano.model.Agendamento;

public interface AgendamentoService {
    Agendamento save(Agendamento agendamento);

    List<Agendamento> findAll();

    Optional<Agendamento> findById(Long id);

    Agendamento update(Agendamento agendamento);

    void remove(Long id);
}
