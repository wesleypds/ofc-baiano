package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Cliente;
import com.oficinadobaiano.model.PreOrcamento;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.ClienteRepository;
import com.oficinadobaiano.repository.PreOrcamentoRepository;
import com.oficinadobaiano.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PreOrcamentoRepository preOrcamentoRepository;

    @Override
    public Cliente save(Cliente cliente) throws MensagemValidacao {
        saveValidation(cliente);
        cliente.setVeiculos(null);
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    public Cliente update(Cliente cliente) throws MensagemValidacao {
        saveValidation(cliente);
        if (!cliente.isOrcamento() || cliente.getVeiculos() != null) {
            cliente.setVeiculos(null);
        }
        return clienteRepository.save(cliente);
    }

    @Override
    public void remove(Long id) throws MensagemValidacao {
        Cliente cliente = new Cliente();
        cliente.setId(id);
        PreOrcamento preOrcamento = preOrcamentoRepository.findByCliente(cliente);
        if (preOrcamento != null) {
            throw new MensagemValidacao(String.format("Este cliente %s está com um pré-orçamento em aberto.", preOrcamento.getCliente().getNome()));
        }
        clienteRepository.deleteById(id);
    }

    private void saveValidation(Cliente cliente) throws MensagemValidacao {
        Cliente db = clienteRepository.findByCpf(cliente.getCpf());
        if (db != null && cliente.getId() == null) {
            throw new MensagemValidacao(String.format("Este cliente %s já está cadastrado.", cliente.getNome()));
        }

        if (cliente.getId() != null) {
            Optional<Cliente> dbCliente = clienteRepository.findById(cliente.getId());
            Cliente c = dbCliente.get();
            if (!c.getCpf().equals(cliente.getCpf())) {
                throw new MensagemValidacao("O campo CPF não pode ser alterado");
            }
            if (!c.getNome().equals(cliente.getNome())) {
                throw new MensagemValidacao("O campo NOME não pode ser alterado");
            }
        }
    }
}
