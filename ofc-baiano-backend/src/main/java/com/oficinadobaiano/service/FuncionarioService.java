package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Funcionario;

public interface FuncionarioService {
    Funcionario save(Funcionario funcionario);

    List<Funcionario> findAll();

    Optional<Funcionario> findById(Long id);

    Funcionario update(Funcionario funcionario);

    void remove(Long id);
}
