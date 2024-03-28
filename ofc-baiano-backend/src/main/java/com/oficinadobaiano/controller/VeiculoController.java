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

import com.oficinadobaiano.model.Veiculo;
import com.oficinadobaiano.service.VeiculoService;

@RestController
@RequestMapping("api/veiculos")
public class VeiculoController {
    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<List<Veiculo>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(veiculoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Veiculo>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Veiculo> create(@RequestBody Veiculo veiculo){
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoService.save(veiculo));
    }

    @PutMapping
    public ResponseEntity<Veiculo> update(@RequestBody Veiculo veiculo){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoService.update(veiculo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        veiculoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
