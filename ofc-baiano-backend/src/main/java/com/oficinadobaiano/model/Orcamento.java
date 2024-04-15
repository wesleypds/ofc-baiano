package com.oficinadobaiano.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Orcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_pre_orcamento", referencedColumnName = "id", nullable = false)
    private PreOrcamento preOrcamento;

    @NotNull
    @Column(name = "data_orcamento", nullable = false)
    private Date dataOrcamento;

    @NotNull
    @Column(name = "valor", nullable = false)
    private Double valor;

    private Integer descontos;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "orcamento_orcamento_produto", 
               joinColumns = @JoinColumn(name = "id_orcamento"), 
               inverseJoinColumns = @JoinColumn(name = "id_orcamento_produto"))
    private List<OrcamentoProduto> produtoOrcamentos;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_orcamento", referencedColumnName = "id", nullable = false)
    private List<OrcamentoServico> servicos;
}
