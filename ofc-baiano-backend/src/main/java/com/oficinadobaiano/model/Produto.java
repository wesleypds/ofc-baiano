package com.oficinadobaiano.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String nome;

    private String codigo;

    private Integer quantidade;

    private Double valor;

    @OneToMany(mappedBy = "produto")
    private List<OrcamentoProduto> produtoOrcamentos;
}
