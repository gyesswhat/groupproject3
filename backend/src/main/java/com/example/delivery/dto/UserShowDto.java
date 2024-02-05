package com.example.delivery.dto;

import com.example.delivery.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserShowDto {
    private String email;

    private String nickname;

    private String account;

    private String bank;

    @Builder
    public UserShowDto(User user){
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.account = user.getAccount();
        this.bank = user.getBank();
    }
}
