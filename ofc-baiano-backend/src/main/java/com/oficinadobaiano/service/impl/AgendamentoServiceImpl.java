package com.oficinadobaiano.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.repository.AgendamentoRepository;
import com.oficinadobaiano.service.AgendamentoService;

@Service
public class AgendamentoServiceImpl implements AgendamentoService{
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Override
    public Agendamento save(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    @Override
    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }

    @Override
    public Optional<Agendamento> findById(Long id) {
        return agendamentoRepository.findById(id);
    }

    @Override
    public Agendamento update(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    @Override
    public void remove(Long id) {
        agendamentoRepository.deleteById(id);
    }
}
