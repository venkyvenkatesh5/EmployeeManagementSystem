package com.mouli.emsbackend.controller;

import com.mouli.emsbackend.dto.LoginRequest;
import com.mouli.emsbackend.dto.RegisterRequest;
import com.mouli.emsbackend.entity.User;
import com.mouli.emsbackend.payload.ApiResponse;
import com.mouli.emsbackend.repository.UserRepository;
import com.mouli.emsbackend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ApiResponse register(@RequestBody RegisterRequest request){

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        userRepository.save(user);

        user.setPassword(null);
        return new ApiResponse("User registered",user,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest request){

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new ApiResponse("Login successful",token,HttpStatus.OK);
    }
}