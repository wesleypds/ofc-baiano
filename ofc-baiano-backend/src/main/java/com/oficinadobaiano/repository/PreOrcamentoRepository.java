package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.PreOrcamento;

public interface PreOrcamentoRepository extends JpaRepository<PreOrcamento, Long> {
    PreOrcamento findByCliente(Cliente cliente);
}
