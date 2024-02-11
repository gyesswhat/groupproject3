package com.example.delivery.controller;

import com.example.delivery.dto.*;
import com.example.delivery.entity.User;
import com.example.delivery.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity<Long> signUp(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
        if(userService.emailCheck(userDto.getEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        User user = userService.signup(userDto);
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).header(session.getId()).body(user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody LoginDto loginDto, HttpServletRequest request) throws Exception {
        User user = userService.login(loginDto);
        if(user==null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).header(session.getId()).body(user.getId());
        //sessionId를 그냥 헤더에 보낼지, 쿠키 생성해서 보낼지
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetailDto> show(@RequestHeader HttpHeaders headers){
        //requestHeader에서 세션id를 가져오면 어떻게 검증?
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        UserDetailDto userInfo = userService.show(id);
        return (userInfo!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(userInfo) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PatchMapping("/user")
    public ResponseEntity<String> edit(@RequestBody UserEditDto userEditDto){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        User updated = userService.update(id, userEditDto);
        return (updated!=null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/user/posts")
    public ResponseEntity<List<UserPartPostList>> showPost(){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        List<UserPartPostList> list = userService.showList(id);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
