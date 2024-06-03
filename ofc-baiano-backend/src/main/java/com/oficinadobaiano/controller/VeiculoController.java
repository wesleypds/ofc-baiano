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

import com.oficinadobaiano.model.Veiculo;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.service.VeiculoService;

@RestController
@RequestMapping("api/veiculos")
public class VeiculoController {
    @Autowired
    private VeiculoService veiculoService;

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
        List<Veiculo> veiculos = veiculoService.findAll();
        response.setSuccess(true);
        response.setData(veiculos);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Veiculo> veiculo = veiculoService.findById(id);
        Veiculo p = veiculo.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Veiculo veiculo){
        veiculo.setId(null);
        Veiculo p = veiculoService.save(veiculo);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Veiculo veiculo){
        Veiculo p = veiculoService.update(veiculo);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Veiculo> veiculo = veiculoService.findById(id);
        Veiculo p = veiculo.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        veiculoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
