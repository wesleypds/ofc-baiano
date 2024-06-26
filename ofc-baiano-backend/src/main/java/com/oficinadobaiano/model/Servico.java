package com.oficinadobaiano.model;

import com.oficinadobaiano.enums.Complexidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private Complexidade complexidade;
}
