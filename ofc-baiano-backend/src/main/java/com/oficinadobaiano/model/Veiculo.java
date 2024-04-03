package com.oficinadobaiano.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "marca", nullable = false)
    private String marca;

    @NotBlank
    @Column(name = "modelo", nullable = false)
    private String modelo;

    @NotBlank
    @Column(name = "cor", nullable = false)
    private String cor;
}
