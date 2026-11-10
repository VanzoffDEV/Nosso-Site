package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    // Puxa direto do application.properties de forma segura
    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    private Cloudinary getCloudinary() {
        return new Cloudinary(Map.of(
            "cloud_name", cloudName,
            "api_key", apiKey,
            "api_secret", apiSecret
        ));
    }

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
     Map<?, ?> uploadResult = getCloudinary().uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
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