package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Cliente;

public interface ClienteService {
    Cliente save(Cliente cliente);

    List<Cliente> findAll();

    Optional<Cliente> findById(Long id);

    Cliente update(Cliente cliente);

    void remove(Long id);
}
