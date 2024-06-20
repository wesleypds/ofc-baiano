package com.oficinadobaiano.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.model.Encerramento;
import com.oficinadobaiano.repository.EncerramentoRepository;
import com.oficinadobaiano.service.EncerramentoService;

@Service
public class EncerramentoServiceImpl implements EncerramentoService {
    @Autowired
    private EncerramentoRepository encerramentoRepository;

    @Autowired
    private AgendamentoServiceImpl agendamentoService;

    @Override
    public Encerramento save(Encerramento encerramento) {
        calculaValorFinal(encerramento);
        return encerramentoRepository.save(encerramento);
    }

    @Override
    public List<Encerramento> findAll() {
        return encerramentoRepository.findAll();
    }

    @Override
    public Optional<Encerramento> findById(Long id) {
        return encerramentoRepository.findById(id);
    }

    @Override
    public Encerramento update(Encerramento encerramento) {
        return encerramentoRepository.save(encerramento);
    }

    @Override
    public void remove(Long id) {
        encerramentoRepository.deleteById(id);
    }

    private void calculaValorFinal(Encerramento entity) {
        Optional<Agendamento> db = agendamentoService.findById(entity.getAgendamento().getId());
        Agendamento agendamento = db.get();
        entity.setValorFinal(agendamento.getOrcamento().getValor());
    }
}
