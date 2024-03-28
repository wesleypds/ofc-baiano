package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Funcionario;
import com.oficinadobaiano.repository.FuncionarioRepository;
import com.oficinadobaiano.service.FuncionarioService;

@Service
public class FuncionarioServiceImpl implements FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Override
    public Funcionario save(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    @Override
    public List<Funcionario> findAll() {
        return funcionarioRepository.findAll();
    }

    @Override
    public Optional<Funcionario> findById(Long id) {
        return funcionarioRepository.findById(id);
    }

    @Override
    public Funcionario update(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    @Override
    public void remove(Long id) {
        funcionarioRepository.deleteById(id);
    }
}
