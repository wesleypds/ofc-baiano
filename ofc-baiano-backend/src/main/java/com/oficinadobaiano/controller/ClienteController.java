package com.oficinadobaiano.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.service.ClienteService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

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
        List<Cliente> clientes = clienteService.findAll();
        response.setSuccess(true);
        response.setData(clientes);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id){
        Optional<Cliente> cliente = clienteService.findById(id);
        Cliente c = cliente.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(c);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Cliente cliente) throws MensagemValidacao{
        cliente.setId(null);
        Cliente c = clienteService.save(cliente);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(c);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Cliente cliente) throws MensagemValidacao{
        cliente.setOrcamento(false);
        Cliente c = clienteService.update(cliente);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(c);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws MensagemValidacao{
        Optional<Cliente> cliente = clienteService.findById(id);
        Cliente c = cliente.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(c);
        clienteService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
