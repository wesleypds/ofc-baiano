package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
}
