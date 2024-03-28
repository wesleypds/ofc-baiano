package com.oficinadobaiano.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nome;
    private String telefone;
    //private Especialidade especialidade;
    private String email;
    private Double salario;
    private Boolean disponibilidade;
    private Integer servicosSendoFeitos;
    //private List<Agendamento> agendamentos; 
}
