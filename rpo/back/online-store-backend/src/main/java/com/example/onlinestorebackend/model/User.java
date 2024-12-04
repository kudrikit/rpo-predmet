package com.example.onlinestorebackend.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
@Table(name = "users")  // Явно задаем имя таблицы, чтобы избежать возможных конфликтов
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String role;
}
