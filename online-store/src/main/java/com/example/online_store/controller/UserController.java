package com.example.online_store.controller;

import com.example.online_store.model.User;
import com.example.online_store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserController(UserService userService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User user) {
    // Создаем нового пользователя и сохраняем его с зашифрованным паролем
    // Убираем лишнюю шифровку, так как она уже делается в сервисе
    User newUser = userService.registerUser(user.getUsername(), user.getPassword());
    return ResponseEntity.ok(newUser);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User loginRequest) {
    // Аутентифицируем пользователя
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );

    // Устанавливаем аутентификацию в контексте безопасности
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Получаем пользователя через Optional
    Optional<User> optionalUser = userService.findByUsername(loginRequest.getUsername());

    if (optionalUser.isPresent()) {
      User authenticatedUser = optionalUser.get();  // Извлекаем объект User из Optional

      // Возвращаем роль пользователя
      Map<String, String> response = new HashMap<>();
      response.put("role", authenticatedUser.getRole());  // Роль пользователя
      response.put("message", "User logged in successfully");

      return ResponseEntity.ok(response);
    } else {
      // Если пользователь не найден, возвращаем ошибку
      return ResponseEntity.status(404).body("User not found");
    }
  }
}
