package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
}
