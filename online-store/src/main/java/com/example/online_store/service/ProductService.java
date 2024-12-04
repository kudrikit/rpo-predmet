package com.example.online_store.service;

import com.example.online_store.model.Product;
import com.example.online_store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Product getProductById(Long id) {
    return productRepository.findById(id).orElse(null);
  }

  public Product addProduct(Product product) {
    System.out.println("Saving product to database");  // Лог для проверки
    return productRepository.save(product);
  }

  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}
