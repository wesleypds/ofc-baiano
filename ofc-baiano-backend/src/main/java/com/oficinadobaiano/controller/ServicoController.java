package com.oficinadobaiano.controller;

import java.util.List;
import java.util.Optional;

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

import com.oficinadobaiano.model.Servico;
import com.oficinadobaiano.service.ServicoService;

@RestController
@RequestMapping("api/servicos")
public class ServicoController {
    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<Servico>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(servicoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Servico>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(servicoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Servico> create(@RequestBody Servico servico){
        return ResponseEntity.status(HttpStatus.CREATED).body(servicoService.save(servico));
    }

    @PutMapping
    public ResponseEntity<Servico> update(@RequestBody Servico servico){
        return ResponseEntity.status(HttpStatus.OK).body(servicoService.update(servico));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        servicoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
