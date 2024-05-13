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

import com.oficinadobaiano.model.Servico;
import com.oficinadobaiano.model.Veiculo;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.service.ServicoService;

@RestController
@RequestMapping("api/servicos")
public class ServicoController {
    @Autowired
    private ServicoService servicoService;

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
        List<Servico> servicos = servicoService.findAll();
        if (servicos.isEmpty()) {
            response.setSuccess(true);
            response.setErrorMsg("Sem serviços");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.setSuccess(true);
        response.setData(servicos);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Servico> servico = servicoService.findById(id);
        Servico p = servico.get();
        Corpo response = new Corpo<>();
        if (servico.isEmpty()) {
            response.setSuccess(true);
            response.setErrorMsg("Serviço não existe");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Servico servico){
        servico.setId(null);
        Servico p = servicoService.save(servico);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Servico servico){
        Servico p = servicoService.update(servico);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(p);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        servicoService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
