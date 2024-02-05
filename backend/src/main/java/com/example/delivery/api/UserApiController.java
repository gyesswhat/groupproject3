package com.example.delivery.api;

import com.example.delivery.dto.LoginDto;
import com.example.delivery.dto.UserDto;
import com.example.delivery.dto.UserEditDto;
import com.example.delivery.dto.UserShowDto;
import com.example.delivery.entity.User;
import com.example.delivery.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserApiController {
    @Autowired
    private UserService userService;
    @Autowired
    private HttpSession session;

    @PostMapping("/signup")
    public ResponseEntity<Long> signUp(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
        if(userService.emailCheck(userDto.getEmail()))
            return null;
        User user = userService.signup(userDto);
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody LoginDto loginDto, HttpServletRequest request) throws Exception {
        User user = userService.login(loginDto);
        if(user==null)
            return null;
        session = request.getSession();
        session.setAttribute("userId",user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }

    @GetMapping("/user")
    public ResponseEntity<UserShowDto> show(){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        UserShowDto userInfo = userService.show(id);
        return (userInfo!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(userInfo) :
                null;
    }

    @PatchMapping("/user")
    public ResponseEntity<String> edit(@RequestBody UserEditDto userEditDto){
        Long id = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        User updated = userService.update(id, userEditDto);
        return (updated!=null) ?
                ResponseEntity.status(HttpStatus.OK).body("200") :
                null;
    }

    @GetMapping("/user/posts")
    public ResponseEntity<Long> showPost(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
