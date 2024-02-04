package com.example.delivery.service;

import com.example.delivery.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public boolean emailCheck(String email){
        return userRepository.existsByEmail(email);
    }

}
