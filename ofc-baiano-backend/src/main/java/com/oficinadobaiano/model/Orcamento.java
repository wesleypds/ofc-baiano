package com.oficinadobaiano.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.Where;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @SuppressWarnings("deprecation")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_orcamento_produto", nullable = false)
    @Where(clause = "deleted=false")
    private List<OrcamentoProduto> produtoOrcamentos;
}
