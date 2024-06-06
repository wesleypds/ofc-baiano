package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Veiculo;
import com.oficinadobaiano.model.VeiculoCliente;

public interface VeiculoClienteRepository extends JpaRepository<VeiculoCliente, Long> {
    VeiculoCliente findByVeiculo(Veiculo veiculo);
}
