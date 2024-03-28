package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
