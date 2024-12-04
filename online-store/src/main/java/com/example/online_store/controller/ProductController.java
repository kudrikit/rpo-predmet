package com.example.online_store.controller;

import com.example.online_store.model.Product;
import com.example.online_store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    Product product = productService.getProductById(id);
    if (product != null) {
      return ResponseEntity.ok(product);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Product addProduct(@RequestBody Product product) {
    System.out.println("Received product: " + product.getName());  // Проверка получения данных
    return productService.addProduct(product);
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.noContent().build();
  }
}
