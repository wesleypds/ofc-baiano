package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Veiculo;

public interface VeiculoService {
    Veiculo save(Veiculo veiculo);

    List<Veiculo> findAll();

    Optional<Veiculo> findById(Long id);

    Veiculo update(Veiculo veiculo);

    void remove(Long id);
}
