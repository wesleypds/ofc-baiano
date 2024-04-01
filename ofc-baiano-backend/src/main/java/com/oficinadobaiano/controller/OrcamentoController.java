package com.oficinadobaiano.controller;

import java.util.Optional;
import java.util.List;
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

import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.service.OrcamentoService;

@RestController
@RequestMapping("api/orcamentos")
public class OrcamentoController {
    @Autowired
    private OrcamentoService orcamentoService;

    @GetMapping
    public ResponseEntity<List<Orcamento>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(orcamentoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orcamento>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(orcamentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Orcamento> create(@RequestBody Orcamento orcamento){
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.save(orcamento));
    }

    @PutMapping
    public ResponseEntity<Orcamento> update(@RequestBody Orcamento orcamento){
        return ResponseEntity.status(HttpStatus.OK).body(orcamentoService.update(orcamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        orcamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
