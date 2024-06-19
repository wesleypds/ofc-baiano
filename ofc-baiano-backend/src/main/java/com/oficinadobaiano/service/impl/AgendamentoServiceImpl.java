package com.oficinadobaiano.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.model.Funcionario;
import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.AgendamentoRepository;
import com.oficinadobaiano.repository.FuncionarioRepository;
import com.oficinadobaiano.repository.OrcamentoRepository;
import com.oficinadobaiano.service.AgendamentoService;

@Service
public class AgendamentoServiceImpl implements AgendamentoService{
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Override
    public Agendamento save(Agendamento agendamento) throws MensagemValidacao {
        saveValidation(agendamento);
        setaDisponibilidadeMecanico(agendamento);
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

    private void saveValidation(Agendamento agendamento) throws MensagemValidacao {
        Optional<Orcamento> dbOrcamento = orcamentoRepository.findById(agendamento.getOrcamento().getId());
        Orcamento orcamento = dbOrcamento.get();
        if (!orcamento.getAprovado()) {
            throw new MensagemValidacao("Só pode agendar se orçamento for aprovado");
        }
    }

    private void setaDisponibilidadeMecanico(Agendamento agendamento) {
        Optional<Funcionario> dbFuncionario = funcionarioRepository.findById(agendamento.getFuncionario().getId());
        Funcionario funcionario = dbFuncionario.get();
        if (funcionario.getServicosSendoFeitos() != null) {
            funcionario.setServicosSendoFeitos(funcionario.getServicosSendoFeitos().intValue() + 1);
            funcionario.setDisponibilidade(false);
        } else {
            funcionario.setServicosSendoFeitos(1);
        }
    }
}
