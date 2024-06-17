package com.oficinadobaiano.controller;

import java.util.*;

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

import com.oficinadobaiano.model.Agendamento;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.service.AgendamentoService;

@RestController
@RequestMapping("api/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoService agendamentoService;

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
        List<Agendamento> agendamentos = agendamentoService.findAll();
        response.setSuccess(true);
        response.setData(agendamentos);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Agendamento> agendamento = agendamentoService.findById(id);
        Agendamento a = agendamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(a);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Agendamento agendamento){
        agendamento.setId(null);
        Agendamento a = agendamentoService.save(agendamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(a);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Agendamento agendamento){
        Agendamento a = agendamentoService.update(agendamento);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(a);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Agendamento> agendamento = agendamentoService.findById(id);
        Agendamento a = agendamento.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(a);
        agendamentoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
