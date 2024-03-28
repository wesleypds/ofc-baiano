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

import com.oficinadobaiano.model.Funcionario;
import com.oficinadobaiano.service.FuncionarioService;

@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {
    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<Funcionario>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Funcionario>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Funcionario> create(@RequestBody Funcionario funcionario){
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
    }

    @PutMapping
    public ResponseEntity<Funcionario> update(@RequestBody Funcionario funcionario){
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.update(funcionario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        funcionarioService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
