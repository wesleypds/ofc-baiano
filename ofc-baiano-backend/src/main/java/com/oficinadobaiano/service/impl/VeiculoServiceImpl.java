package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Veiculo;
import com.oficinadobaiano.model.VeiculoCliente;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.VeiculoClienteRepository;
import com.oficinadobaiano.repository.VeiculoRepository;
import com.oficinadobaiano.service.VeiculoService;

@Service
public class VeiculoServiceImpl implements VeiculoService {
    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private VeiculoClienteRepository veiculoClienteRepository;

    @Override
    public Veiculo save(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    @Override
    public List<Veiculo> findAll() {
        return veiculoRepository.findAll();
    }

    @Override
    public Optional<Veiculo> findById(Long id) {
        return veiculoRepository.findById(id);
    }

    @Override
    public Veiculo update(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    @Override
    public void remove(Long id) throws MensagemValidacao {
        Veiculo veiculo = new Veiculo();
        veiculo.setId(id);
        VeiculoCliente v = veiculoClienteRepository.findByVeiculo(veiculo);
        if (v != null) {
            throw new MensagemValidacao("Este veículo está associado a um cliente.");
        }
        veiculoRepository.deleteById(id);
    }
}
