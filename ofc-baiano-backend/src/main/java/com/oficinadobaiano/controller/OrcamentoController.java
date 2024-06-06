package com.oficinadobaiano.controller;

import java.util.Optional;
import java.util.List;
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

import com.oficinadobaiano.model.Orcamento;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.service.OrcamentoService;

@RestController
@RequestMapping("api/orcamentos")
public class OrcamentoController {
    @Autowired
    private OrcamentoService orcamentoService;

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
        List<Orcamento> orcamentos = orcamentoService.findAll();
        response.setSuccess(true);
        response.setData(orcamentos);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Orcamento> orcamento = orcamentoService.findById(id);
        Orcamento p = orcamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Orcamento orcamento){
        orcamento.setId(null);
        Orcamento p = orcamentoService.save(orcamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Orcamento orcamento){
        Orcamento p = orcamentoService.update(orcamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Orcamento> orcamento = orcamentoService.findById(id);
        Orcamento p = orcamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        orcamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
