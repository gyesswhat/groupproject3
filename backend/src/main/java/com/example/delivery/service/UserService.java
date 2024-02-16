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
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    public boolean emailCheck(String email){
        User user = userRepository.findByEmail(email).orElse(null);
        return (user!=null);
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
        UserDetailDto userInfo = new UserDetailDto(user);
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

    public List<PostListDto> getPost(Long id){
        List<PostListDto> posts = postRepository.findPostListInMyPage(id);
        return posts;
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
