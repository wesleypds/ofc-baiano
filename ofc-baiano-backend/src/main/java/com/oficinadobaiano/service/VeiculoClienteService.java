package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.VeiculoCliente;

public interface VeiculoClienteService {
    VeiculoCliente save(VeiculoCliente veiculoCliente);

    List<VeiculoCliente> findAll();

    Optional<VeiculoCliente> findById(Long id);

    VeiculoCliente update(VeiculoCliente veiculoCliente);

    void remove(Long id);
}
