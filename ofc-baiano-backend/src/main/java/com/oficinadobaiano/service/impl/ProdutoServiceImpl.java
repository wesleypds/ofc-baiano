package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Produto;
import com.oficinadobaiano.repository.ProdutoRepository;
import com.oficinadobaiano.service.ProdutoService;

@Service
public class ProdutoServiceImpl implements ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;
    
    @Override
    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    @Override
    public Optional<Produto> findById(Long id) {
        return produtoRepository.findById(id);
    }

    @Override
    public Produto update(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public void remove(Long id) {
        produtoRepository.deleteById(id);
    }
}
