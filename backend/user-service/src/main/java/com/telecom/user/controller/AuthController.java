package com.telecom.user.controller;

import com.telecom.user.dto.AuthRequest;
import com.telecom.user.dto.AuthResponse;
import com.telecom.user.dto.RegisterRequest;
import com.telecom.user.dto.UserDto;
import com.telecom.user.entity.User;
import com.telecom.user.service.UserService;
import com.telecom.user.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse(null, null, "Invalid credentials"));
        }

        final UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        
        User user = userService.findByEmail(authRequest.getEmail());
        UserDto userDto = new UserDto(user.getId(), user.getFullName(), user.getEmail(), 
                                     user.getRole().name(), user.getPhoneNumber(), 
                                     user.getAddress(), user.isActive());

        return ResponseEntity.ok(new AuthResponse(jwt, userDto, "Login successful"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, "Email already exists"));
            }

            User user = userService.createUser(registerRequest);
            final String jwt = jwtUtil.generateToken(user);
            
            UserDto userDto = new UserDto(user.getId(), user.getFullName(), user.getEmail(), 
                                         user.getRole().name(), user.getPhoneNumber(), 
                                         user.getAddress(), user.isActive());

            return ResponseEntity.ok(new AuthResponse(jwt, userDto, "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponse(null, null, "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userService.loadUserByUsername(username);
            
            if (jwtUtil.validateToken(token, userDetails)) {
                User user = userService.findByEmail(username);
                UserDto userDto = new UserDto(user.getId(), user.getFullName(), user.getEmail(), 
                                             user.getRole().name(), user.getPhoneNumber(), 
                                             user.getAddress(), user.isActive());
                return ResponseEntity.ok(new AuthResponse(token, userDto, "Token valid"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse(null, null, "Token validation failed"));
        }
    }
}
