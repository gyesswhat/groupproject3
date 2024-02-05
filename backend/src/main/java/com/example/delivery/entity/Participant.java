package com.example.delivery.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor // 생성자 자동 생성
@NoArgsConstructor // 기본생성자 자동 생성
@ToString // toString() 자동생성
@Setter
@Getter // 게터 만들어줌
public class Participant {
    @Id
    private Integer postId; // 외래 키 지정 어떻게?
    @Id
    private Integer userId; // 외래 키 지정 어떻게?
    @Column
    private Timestamp joinedAt;
    @Column
    private String status;
}
