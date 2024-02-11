package com.example.delivery.service;

import com.example.delivery.dto.*;
import com.example.delivery.entity.User;
import com.example.delivery.repository.PostRepository;
import com.example.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    public boolean emailCheck(String email){
        User user = userRepository.findByEmail(email).orElse(null);
        return (user != null);
    }

    public User signup(UserDto userDto) throws NoSuchAlgorithmException {
        userDto.setPassword(encrypt(userDto.getPassword()));
        User user = userDto.toEntity();
        userRepository.save(user);
        return user;
    }

    public User login(LoginDto loginDto) throws NoSuchAlgorithmException{
        User user = userRepository.findByEmail(loginDto.getEmail()).orElse(null);
        String encodingPassword = encrypt(loginDto.getPassword());
        if(user != null && (user.getPassword().equals(encodingPassword)))
            return user;
        else
            return null;
    }

    public UserDetailDto show(Long id){
        User user = userRepository.findById(id).orElse(null);
        if(user==null)
            return null;
        UserDetailDto userInfo = userRepository.findUserDetail(user.getId());
        return userInfo;
    }

    public User update(Long id, UserEditDto userInfo){
        User target = userRepository.findById(id).orElse(null);
        if(target==null)
            return null;
        target.update(userInfo);
        User updated = userRepository.save(target);
        return updated;
    }

    public List<UserPartPostList> showList(Long id){
        List<UserPartPostList> list = postRepository.findUserPartPostList(id);
        LocalTime now = LocalDateTime.now().toLocalTime();
        for(UserPartPostList check : list){
            LocalTime createdAt = check.getCreatedAt().toLocalDateTime().toLocalTime();
            Duration diff = Duration.between(createdAt, now);
            long diffMin = diff.toMinutes();
            check.setOrdering(diffMin <= 30); // 30분 초과 시 바로 주문 취소? 그럼 부등호 '<' 로 해야하나?
        }
        return list;
    }

    public static String encrypt(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] passByte = password.getBytes(StandardCharsets.UTF_8);
        md.reset();
        byte[] digested = md.digest(passByte);
        StringBuffer sb = new StringBuffer();
        for(int i=0;i < digested.length;i++){
            sb.append(Integer.toHexString(0xff & digested[i]));
        }
        return sb.toString();
    }

}
