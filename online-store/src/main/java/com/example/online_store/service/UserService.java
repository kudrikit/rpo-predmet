package com.example.online_store.service;

import com.example.online_store.model.User;
import com.example.online_store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User registerUser(String username, String password) {
    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole("USER");
    return userRepository.save(user);
  }

  public User registerAdmin(String username, String password) {
    User admin = new User();
    admin.setUsername(username);
    admin.setPassword(passwordEncoder.encode(password));
    admin.setRole("ADMIN");
    return userRepository.save(admin);
  }

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }
}
