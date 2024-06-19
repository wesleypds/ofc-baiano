package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.Orcamento;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {
    public Orcamento findByCliente(Cliente cliente);
}
