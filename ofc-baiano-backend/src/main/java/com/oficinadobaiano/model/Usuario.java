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
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "usuario", nullable = false)
    private String usuario;

    @NotBlank
    @Column(name = "senha", nullable = false)
    private String senha;

    @NotBlank
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @NotBlank
    @Column(name = "email", nullable = false)
    private String email;
}
