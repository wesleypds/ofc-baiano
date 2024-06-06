package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;

public interface ClienteService {
    Cliente save(Cliente cliente) throws MensagemValidacao;

    List<Cliente> findAll();

    Optional<Cliente> findById(Long id);

    Cliente update(Cliente cliente) throws MensagemValidacao;

    void remove(Long id) throws MensagemValidacao;
}
