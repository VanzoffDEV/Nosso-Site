package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository repository;

    @GetMapping
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return repository.save(project);
    }

    // Adicione este método nos dois Controllers (ajustando o nome da classe)
@DeleteMapping("/{id}")
public void excluir(@PathVariable Long id) {
    repository.deleteById(id);
}
}