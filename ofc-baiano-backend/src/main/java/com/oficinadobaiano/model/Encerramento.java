package com.oficinadobaiano.model;

import java.util.Date;

import com.oficinadobaiano.enums.TipoPagamento;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Encerramento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date dataEntrega;

    private TipoPagamento tipoPagamento;

    private Double valorFinal;

    @OneToOne
    @JoinColumn(name = "id_agendamento", referencedColumnName = "id")
    private Agendamento agendamento;
}
