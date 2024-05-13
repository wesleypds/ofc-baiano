package com.oficinadobaiano.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oficinadobaiano.model.Funcionario;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.service.FuncionarioService;

@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {
    @Autowired
    private FuncionarioService funcionarioService;

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Corpo> handleAllExceptions(Exception ex) {
        Corpo error = new Corpo<>();
        error.setSuccess(false);
        String errorMessage = ex.getMessage();
        error.setErrorMsg(errorMessage);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping
    public ResponseEntity<Corpo> findAll() {
        Corpo response = new Corpo<>();
        List<Funcionario> funcionarios = funcionarioService.findAll();
        if (funcionarios.isEmpty()) {
            response.setSuccess(true);
            response.setErrorMsg("Sem funcionários");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.setSuccess(true);
        response.setData(funcionarios);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Funcionario> funcionario = funcionarioService.findById(id);
        Funcionario f = funcionario.get();
        Corpo response = new Corpo<>();
        if (funcionario.isEmpty()) {
            response.setSuccess(true);
            response.setErrorMsg("Funcionário não existe");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.setSuccess(true);
        response.setData(f);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Funcionario funcionario){
        funcionario.setId(null);
        Funcionario f = funcionarioService.save(funcionario);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(f);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Funcionario funcionario){
        Funcionario f = funcionarioService.update(funcionario);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(f);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        funcionarioService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
