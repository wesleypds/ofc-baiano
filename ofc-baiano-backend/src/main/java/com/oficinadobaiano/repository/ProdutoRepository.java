package com.oficinadobaiano.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oficinadobaiano.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
}
