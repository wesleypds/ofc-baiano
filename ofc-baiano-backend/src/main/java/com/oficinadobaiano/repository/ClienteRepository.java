package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    public Cliente findByCpf(String cpf);
}
