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

import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.service.PreOrcamentoService;

@RestController
@RequestMapping("api/pre-orcamentos")
public class PreOrcamentoController {
    @Autowired
    private PreOrcamentoService preOrcamentoService;

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
        List<PreOrcamento> preOrcamentos = preOrcamentoService.findAll();
        response.setSuccess(true);
        response.setData(preOrcamentos);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<PreOrcamento> preOrcamento = preOrcamentoService.findById(id);
        PreOrcamento p = preOrcamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody PreOrcamento preOrcamento) throws MensagemValidacao{
        preOrcamento.setId(null);
        PreOrcamento p = preOrcamentoService.save(preOrcamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody PreOrcamento preOrcamento){
        PreOrcamento p = preOrcamentoService.update(preOrcamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<PreOrcamento> preOrcamento = preOrcamentoService.findById(id);
        PreOrcamento p = preOrcamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        preOrcamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
