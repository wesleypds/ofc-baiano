package com.oficinadobaiano.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.service.AgendamentoService;

@RestController
@RequestMapping("api/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public ResponseEntity<List<Agendamento>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Agendamento>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Agendamento> create(@RequestBody Agendamento agendamento){
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoService.save(agendamento));
    }

    @PutMapping
    public ResponseEntity<Agendamento> update(@RequestBody Agendamento agendamento){
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoService.update(agendamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        agendamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
