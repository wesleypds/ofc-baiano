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

    @NotBlank(message = "O campo usuario deve ser preenchido")
    @Column(name = "usuario", nullable = false)
    private String usuario;

    @NotBlank(message = "O campo nome deve ser preenchido")
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotBlank(message = "O campo senha deve ser preenchido")
    @Column(name = "senha", nullable = false)
    private String senha;

    @NotBlank(message = "O campo tipo deve ser preenchido")
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @NotBlank(message = "O campo email deve ser preenchido")
    @Column(name = "email", nullable = false)
    private String email;
}
