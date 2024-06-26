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
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Orcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    private PreOrcamento preOrcamento;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Cliente cliente;

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

    private String problemaCliente;

    private String problemaMecanico;

    private Boolean aprovado;
}
