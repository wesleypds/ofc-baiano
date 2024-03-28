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

import com.oficinadobaiano.model.VeiculoCliente;
import com.oficinadobaiano.service.VeiculoClienteService;

@RestController
@RequestMapping("api/veiculos-clientes")
public class VeiculoClienteController {
    @Autowired
    private VeiculoClienteService veiculoClienteService;

    @GetMapping
    public ResponseEntity<List<VeiculoCliente>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(veiculoClienteService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<VeiculoCliente>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoClienteService.findById(id));
    }

    @PostMapping
    public ResponseEntity<VeiculoCliente> create(@RequestBody VeiculoCliente veiculoCliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoClienteService.save(veiculoCliente));
    }

    @PutMapping
    public ResponseEntity<VeiculoCliente> update(@RequestBody VeiculoCliente veiculoCliente){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoClienteService.update(veiculoCliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        veiculoClienteService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
