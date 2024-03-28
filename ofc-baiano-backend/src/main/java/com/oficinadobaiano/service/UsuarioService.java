package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Usuario;

public interface UsuarioService {
    Usuario save(Usuario usuario);

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Usuario update(Usuario usuario);

    void remove(Long id);
}
