package com.oficinadobaiano.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficinadobaiano.model.Usuario;
import com.oficinadobaiano.model.excecoes.MensagemValidacao;
import com.oficinadobaiano.repository.UsuarioRepository;
import com.oficinadobaiano.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario save(Usuario usuario) throws MensagemValidacao {
        saveValidation(usuario);
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario update(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void remove(Long id) {
        usuarioRepository.deleteById(id);
    }

    private void saveValidation(Usuario usuario) throws MensagemValidacao {
        Usuario user = usuarioRepository.findByUsuario(usuario.getUsuario());
        if (user != null) {
            throw new MensagemValidacao("Usuário já cadastrado");
        }
        user = null;
        user = usuarioRepository.findByEmail(usuario.getEmail());
        if (user != null) {
            throw new MensagemValidacao("E-mail já vinculado a um usuário");
        }
    }

    @Override
    public Usuario userAutentication(String usuario, String senha) throws MensagemValidacao {
        Usuario user = usuarioRepository.findByUsuario(usuario);
        if (user == null) {
            throw new MensagemValidacao("Usuário não encontrado");
        }

        if (!user.getSenha().equals(senha)) {
            throw new MensagemValidacao("Senha incorreta");
        }
        return user;
    }
}
