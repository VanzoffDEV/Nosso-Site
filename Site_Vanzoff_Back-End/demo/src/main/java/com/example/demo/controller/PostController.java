package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*", allowedHeaders = "*")// Permite que o seu React (Vite) acesse o Back-end
public class PostController {

    @Autowired
    private PostRepository repository;

    // Método para listar todos os posts (para o Blog do site)
    @GetMapping
    public List<Post> getAllPosts() {
        return repository.findAll();
    }

    // Método para criar um novo post (para o seu Painel Admin)
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return repository.save(post);
    }

    // Adicione este método nos dois Controllers (ajustando o nome da classe)
@DeleteMapping("/{id}")
public void excluir(@PathVariable Long id) {
    repository.deleteById(id);
}

}
