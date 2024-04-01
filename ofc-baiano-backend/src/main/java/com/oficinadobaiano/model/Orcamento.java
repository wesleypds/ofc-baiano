package com.oficinadobaiano.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Orcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Date dataEntrada;

    private Double valor;

    private Integer descontos;

    @OneToMany(mappedBy = "orcamento")
    private List<OrcamentoProduto> produtoOrcamentos;
}
