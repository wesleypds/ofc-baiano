package com.oficinadobaiano.service;

import java.util.List;
import java.util.Optional;

import com.oficinadobaiano.model.Produto;

public interface ProdutoService {
    Produto save(Produto produto);

    List<Produto> findAll();

    Optional<Produto> findById(Long id);

    Produto update(Produto produto);

    void remove(Long id);
}
