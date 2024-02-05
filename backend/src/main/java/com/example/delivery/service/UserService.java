package com.example.delivery.service;

import com.example.delivery.dto.LoginDto;
import com.example.delivery.dto.UserDto;
import com.example.delivery.dto.UserEditDto;
import com.example.delivery.dto.UserShowDto;
import com.example.delivery.entity.User;
import com.example.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean emailCheck(String email){
        return userRepository.existsByEmail(email);
    }

    public User signup(UserDto userDto) throws NoSuchAlgorithmException {
        userDto.passwordEncoding(encrypt(userDto.getPassword()));
        User user = userDto.toEntity();
        userRepository.save(user);
        return user;
    }

    public User login(LoginDto loginDto) throws NoSuchAlgorithmException{
        User user = userRepository.findByEmail(loginDto.getEmail());
        String encodingPassword = encrypt(loginDto.getPassword());
        if(user != null && (user.getPassword().equals(encodingPassword)))
            return user;
        else
            return null;
    }

    public UserShowDto show(Long id){
        User user = userRepository.findById(id).orElse(null);
        if(user==null)
            return null;
        UserShowDto userInfo = new UserShowDto(user);
        return userInfo;
    }

    public User update(Long id, UserEditDto userInfo){
        User target = userRepository.findById(id).orElse(null);
        target.patch(userInfo);
        User updated = userRepository.save(target);
        return updated;
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
