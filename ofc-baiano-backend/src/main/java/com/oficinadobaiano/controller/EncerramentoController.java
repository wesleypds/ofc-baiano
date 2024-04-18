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

import com.oficinadobaiano.model.Encerramento;
import com.oficinadobaiano.service.EncerramentoService;

@RestController
@RequestMapping("api/encerramentos")
public class EncerramentoController {
    @Autowired
    private EncerramentoService encerramentoService;

    @GetMapping
    public ResponseEntity<List<Encerramento>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(encerramentoService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Encerramento>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(encerramentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Encerramento> create(@RequestBody Encerramento encerramento){
        return ResponseEntity.status(HttpStatus.CREATED).body(encerramentoService.save(encerramento));
    }

    @PutMapping
    public ResponseEntity<Encerramento> update(@RequestBody Encerramento encerramento){
        return ResponseEntity.status(HttpStatus.OK).body(encerramentoService.update(encerramento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        encerramentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
