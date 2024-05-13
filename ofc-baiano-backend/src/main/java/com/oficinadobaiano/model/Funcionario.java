package com.oficinadobaiano.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "nome", nullable = false)
    private String nome;

    private String telefone;

    //private Especialidade especialidade;

    private String email;

    @NotNull
    @Column(name = "salario", nullable = false)
    private Double salario;

    private Boolean disponibilidade;

    private Integer servicosSendoFeitos;
}
