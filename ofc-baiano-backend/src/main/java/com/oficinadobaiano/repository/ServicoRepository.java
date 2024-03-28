package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
    
}
