package com.example.onlinestorebackend.controller;

import com.example.onlinestorebackend.model.User;
import com.example.onlinestorebackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/register")
  public User registerUser(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }
}
