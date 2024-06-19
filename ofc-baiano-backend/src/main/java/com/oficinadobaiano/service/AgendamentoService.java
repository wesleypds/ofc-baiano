package com.oficinadobaiano.service;

import java.util.*;

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;

public interface AgendamentoService {
    Agendamento save(Agendamento agendamento) throws MensagemValidacao;

    List<Agendamento> findAll();

    Optional<Agendamento> findById(Long id);

    Agendamento update(Agendamento agendamento);

    void remove(Long id);
}
