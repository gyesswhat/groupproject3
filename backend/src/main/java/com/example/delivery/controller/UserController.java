package com.example.delivery.controller;

import com.example.delivery.dto.*;
import com.example.delivery.entity.User;
import com.example.delivery.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private HttpSession session;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
        if(userService.emailCheck(userDto.getEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 존재하는 이메일입니다.");
        User user = userService.signup(userDto);
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).header(session.getId()).body(user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletRequest request) throws Exception {
        User user = userService.login(loginDto);
        if(user==null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다.");
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).header(session.getId()).body(user.getId());
    }

    @GetMapping("/user")
    public ResponseEntity<?> show(){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        UserDetailDto userInfo = userService.show(id);
        return (userInfo!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(userInfo) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("유저를 찾을 수 없습니다.");
    }

    @PatchMapping("/user")
    public ResponseEntity<String> edit(@RequestBody UserEditDto userEditDto){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        User updated = userService.update(id, userEditDto);
        return (updated!=null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("유저를 찾을 수 없습니다.");
    }

    @GetMapping("/user/posts")
    public ResponseEntity<List<PostListDto>> showPost(){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        List<PostListDto> posts = userService.getPost(id);
        return (posts!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(posts) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
