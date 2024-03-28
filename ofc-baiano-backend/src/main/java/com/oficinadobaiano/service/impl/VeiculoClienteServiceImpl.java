package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.VeiculoCliente;
import com.oficinadobaiano.repository.VeiculoClienteRepository;
import com.oficinadobaiano.service.VeiculoClienteService;

@Service
public class VeiculoClienteServiceImpl implements VeiculoClienteService {
    @Autowired
    private VeiculoClienteRepository veiculoClienteRepository;

    @Override
    public VeiculoCliente save(VeiculoCliente veiculoCliente) {
        return veiculoClienteRepository.save(veiculoCliente);
    }

    @Override
    public List<VeiculoCliente> findAll() {
        return veiculoClienteRepository.findAll();
    }

    @Override
    public Optional<VeiculoCliente> findById(Long id) {
        return veiculoClienteRepository.findById(id);
    }

    @Override
    public VeiculoCliente update(VeiculoCliente veiculoCliente) {
        return veiculoClienteRepository.save(veiculoCliente);
    }

    @Override
    public void remove(Long id) {
        veiculoClienteRepository.deleteById(id);
    }
}
