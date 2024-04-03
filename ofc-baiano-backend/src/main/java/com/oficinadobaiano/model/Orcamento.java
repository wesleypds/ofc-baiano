package com.oficinadobaiano.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity
public class Orcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date dataEntrada;

    private Double valor;

    private Integer descontos;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "orcamento_orcamento_produto", 
               joinColumns = @JoinColumn(name = "id_orcamento"), 
               inverseJoinColumns = @JoinColumn(name = "id_orcamento_produto"))
    private List<OrcamentoProduto> produtoOrcamentos;
}
