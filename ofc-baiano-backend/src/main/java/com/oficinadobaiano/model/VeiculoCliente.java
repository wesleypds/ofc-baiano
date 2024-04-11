package com.oficinadobaiano.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class VeiculoCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O campo Veículo é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_veiculo", referencedColumnName = "id", nullable = false)
    private Veiculo veiculo;

    @NotBlank(message = "O campo Placa do Veículo é obrigatório")
    @Column(name = "placa_veiculo", nullable = false)
    private String placaVeiculo;

    @NotBlank(message = "O campo Ano do Veículo é obrigatório")
    @Column(name = "ano_veiculo", nullable = false)
    private String anoVeiculo;
}
