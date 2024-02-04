package com.example.delivery.api;

import com.example.delivery.dto.UserDto;
import com.example.delivery.entity.User;
import com.example.delivery.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserApiController {
    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<Long> signUp(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
        if(userService.emailCheck(userDto.getEmail()))
            return null;
        User user = userService.signup(userDto);
        HttpSession session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }

}
