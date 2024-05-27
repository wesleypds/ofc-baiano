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

import com.oficinadobaiano.base.CorsConfig;
import com.oficinadobaiano.model.Usuario;
import com.oficinadobaiano.model.dto.Corpo;
import com.oficinadobaiano.model.dto.Token;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.service.UsuarioService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

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
        List<Usuario> usuario = usuarioService.findAll();
        if (usuario.isEmpty()) {
            response.setSuccess(true);
            response.setErrorMsg("Sem usuários");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.setSuccess(true);
        response.setOptions(new Token("7f08f0ae81840a4a1887d3bdf9201efb"));
        response.setData(usuario);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/autenticacao")
    public ResponseEntity<Corpo> findUserAutentication(@RequestParam String usuario, @RequestParam String senha) throws MensagemValidacao {
        Usuario user = usuarioService.userAutentication(usuario, senha);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setOptions(new Token("7f08f0ae81840a4a1887d3bdf9201efb"));
        response.setData(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    

    @SuppressWarnings({"rawtypes","unchecked"})
    @GetMapping("/{id}")
    public ResponseEntity<Corpo> findById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        Usuario user = usuario.get();
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping
    public ResponseEntity<Corpo> create(@RequestBody Usuario usuario) {
        Usuario user = usuarioService.save(usuario);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping
    public ResponseEntity<Corpo> update(@RequestBody Usuario usuario) {
        Usuario user = usuarioService.update(usuario);
        Corpo response = new Corpo<>();
        response.setSuccess(true);
        response.setData(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        usuarioService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
