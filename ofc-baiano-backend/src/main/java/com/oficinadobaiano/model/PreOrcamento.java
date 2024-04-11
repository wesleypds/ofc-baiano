package com.oficinadobaiano.model;

import com.oficinadobaiano.enums.EscolhaCliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class PreOrcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo Escolha é obrigatório")
    @Column(name = "escolha")
    private EscolhaCliente escolha;

    @NotNull(message = "O campo Cliente é obrigatório")
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Cliente cliente;

    private String problema;
}
