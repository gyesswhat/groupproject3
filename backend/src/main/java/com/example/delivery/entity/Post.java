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
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer postId; // null 때문에...
    @Column private Integer userId;
    @Column private String location;
    @Column private String category;
    @Column private String restaurant;
    @Column private String menu;
    @Column private int partNum;
    @Column private int price;
    @Column private String postBody;
    @Column private Timestamp createdAt; // 사용법 확실히...

}
