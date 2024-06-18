package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.model.PreOrcamento;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {
    public Orcamento findByPreOrcamento(PreOrcamento preOrcamento);
}
