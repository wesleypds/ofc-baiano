package com.oficinadobaiano.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String tipo;
    private String tempoEstimado;
    private Double valor;
    @OneToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;
    private String complexidade;
}
