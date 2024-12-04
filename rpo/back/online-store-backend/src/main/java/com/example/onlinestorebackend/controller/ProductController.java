package com.example.onlinestorebackend.controller;

import com.example.onlinestorebackend.model.Product;
import com.example.onlinestorebackend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

  private final ProductRepository productRepository;

  public ProductController(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @GetMapping("/products")
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  @PostMapping("/products")
  public Product createProduct(@RequestBody Product product) {
    return productRepository.save(product);
  }
}
