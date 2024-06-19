package com.oficinadobaiano.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Date inicioServico;

    @NotNull
    @OneToOne
    private Orcamento orcamento;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", referencedColumnName = "id")
    private Funcionario funcionario;
    
    private Boolean finalizado = false;
}
