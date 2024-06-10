package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Usuario;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;

public interface UsuarioService {
    Usuario save(Usuario usuario) throws MensagemValidacao;

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Usuario update(Usuario usuario);

    void remove(Long id);

    Usuario userAutentication(String usuario, String senha) throws MensagemValidacao;
}
