package com.example.delivery.api;

import com.example.delivery.dto.UserDto;
import com.example.delivery.entity.User;
import com.example.delivery.repository.UserRepository;
import com.example.delivery.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserRepository userRepository;
    private final UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<Long> signUp(@RequestBody UserDto userDto){
        User user = userDto.toEntity();
        if(userService.emailCheck(user.getEmail()))
            return null;
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }
    
}
