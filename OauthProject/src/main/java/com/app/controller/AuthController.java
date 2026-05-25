package com.app.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.app.dto.LoginRequest;
import com.app.dto.RegisterRequest;
import com.app.entity.User;
import com.app.repository.UserRepository;
import com.app.security.JwtService;
import com.app.service.EmailService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationProvider authenticationProvider;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            AuthenticationProvider authenticationProvider,
            JwtService jwtService,
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // Step 1: Authenticate username & password
        Authentication auth = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        );
        authenticationProvider.authenticate(auth);

        // Step 2: Check if email is verified
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            return ResponseEntity.status(403)
                    .body("Please verify your email before logging in. Check your inbox.");
        }

        // Step 3: Generate and return JWT token
        String token = jwtService.generateToken(request.getUsername());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setFullName(request.getFull_name());
        user.setEmail(request.getEmail());

        // encrypted password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        if (request.getDob() != null && !request.getDob().isBlank()) {
            user.setDob(LocalDate.parse(request.getDob()));
        }
        user.setAge(request.getAge());
        user.setContact(request.getContact());
        user.setStreet(request.getStreet());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setCountry(request.getCountry());
        user.setPinCode(request.getPinCode());
        user.setIsAdmin(false);
        user.setCreatedAt(LocalDateTime.now());
        

        // generate token
        String token = UUID.randomUUID().toString();
        user.setVerified(false);
        user.setVerificationToken(token);


        User savedUser = userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), user.getUsername(), token);

        return "Registration successful";
    }
    
    

@GetMapping("/verify-email")
public ResponseEntity<?> verifyEmail(@RequestParam String token) {
    User user = userRepository.findByVerificationToken(token)
        .orElseThrow(() -> new RuntimeException("Invalid token"));

    user.setVerified(true);
    user.setVerificationToken(null); // clear token after use
    userRepository.save(user);

    return ResponseEntity.ok("Email verified successfully! You can now login.");
}
}