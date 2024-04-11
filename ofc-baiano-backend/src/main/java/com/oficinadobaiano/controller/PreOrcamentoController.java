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

import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.service.PreOrcamentoService;

@RestController
@RequestMapping("api/pre-orcamentos")
public class PreOrcamentoController {
    @Autowired
    private PreOrcamentoService preOrcamentoService;

    @GetMapping
    public ResponseEntity<List<PreOrcamento>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(preOrcamentoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<PreOrcamento>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(preOrcamentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PreOrcamento> create(@RequestBody PreOrcamento preOrcamento){
        return ResponseEntity.status(HttpStatus.CREATED).body(preOrcamentoService.save(preOrcamento));
    }

    @PutMapping
    public ResponseEntity<PreOrcamento> update(@RequestBody PreOrcamento preOrcamento){
        return ResponseEntity.status(HttpStatus.OK).body(preOrcamentoService.update(preOrcamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        preOrcamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
