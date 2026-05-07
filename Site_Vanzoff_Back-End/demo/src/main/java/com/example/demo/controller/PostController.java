package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    @Autowired
    private PostRepository repository;

    // Configuração do Cloudinary (Pegue as chaves no site deles, é grátis)
   Cloudinary cloudinary = new Cloudinary(Map.of(
    "cloud_name", "dqkstxbao",
    "api_key", "412218277261775",
    "api_secret", "8b9aFBNZtKUA7NbrkIIYubrHiL0" // Clique no ícone do olho no print para ver e copiar
));
    @GetMapping
    public List<Post> getAllPosts() {
        return repository.findAll();
    }

    @PostMapping
    public Post createPost(
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("summary") String summary,
            @RequestParam("image") MultipartFile image) throws Exception {
        
        // 1. Faz o upload da imagem para o Cloudinary
       Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        String imageUrl = uploadResult.get("url").toString();

        // 2. Cria o objeto Post com a URL retornada
        Post post = new Post();
        post.setTitle(title);
        post.setCategory(category);
        post.setSummary(summary);
        post.setImageUrl(imageUrl); // Salva o link da nuvem no banco

        return repository.save(post);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}