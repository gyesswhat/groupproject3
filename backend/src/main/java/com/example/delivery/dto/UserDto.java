package com.example.delivery.dto;

import com.example.delivery.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String email;

    private String password;

    private String nickname;

    private String account;

    private String bank;

    public User toEntity(){
        return (new User(null, email, password, nickname, account, bank));
    }
}
