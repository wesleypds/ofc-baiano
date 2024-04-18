package com.oficinadobaiano.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.service.ClienteService;

import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping
    public ResponseEntity<List<Cliente>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Cliente>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Cliente> create(@RequestBody Cliente cliente) throws MensagemValidacao{
        cliente.setId(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(cliente));
    }

    @PutMapping
    public ResponseEntity<Cliente> update(@RequestBody Cliente cliente) throws MensagemValidacao{
        cliente.setOrcamento(false);
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.update(cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        clienteService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
