package com.oficinadobaiano.model;

import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "nome", nullable = false)
    private String nome;
    
    private String endereco;

    private String telefone;

    @NotBlank
    @Column(name = "cpf", nullable = false)
    private String cpf;

    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private List<VeiculoCliente> veiculos;
}
