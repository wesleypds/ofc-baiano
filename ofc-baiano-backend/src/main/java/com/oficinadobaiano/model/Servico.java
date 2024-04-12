package com.oficinadobaiano.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "tipo", nullable = false)
    private String tipo;

    private String tempoEstimado;

    private Double valor;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", referencedColumnName = "id")
    private Funcionario funcionario;

    private String complexidade;
}
