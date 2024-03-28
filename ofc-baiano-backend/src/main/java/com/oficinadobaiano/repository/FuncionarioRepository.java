package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
}
