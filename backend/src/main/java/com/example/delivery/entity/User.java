package com.example.delivery.entity;

import com.example.delivery.dto.UserEditDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String account;

    @Column(nullable = false)
    private String bank;

    public void update(UserEditDto userInfo) {
        if(userInfo.getNickname()!=null)
            this.nickname = userInfo.getNickname();
        if(userInfo.getAccount()!=null)
            this.account = userInfo.getAccount();
        if(userInfo.getBank()!=null)
            this.bank = userInfo.getBank();
    }
}
