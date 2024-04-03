package com.oficinadobaiano.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class VeiculoCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Cliente cliente;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_veiculo", referencedColumnName = "id")
    private Veiculo veiculo;

    @NotBlank
    @Column(name = "placa_veiculo", nullable = false)
    private String placaVeiculo;

    @NotBlank
    @Column(name = "ano_veiculo", nullable = false)
    private String anoVeiculo;
}
