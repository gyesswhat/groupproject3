package com.example.delivery.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Table(name="post")
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long postId;
    @ManyToOne
    @JoinColumn(name = "user_id") private User user;
    @Column(nullable = false) private String location;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String restaurant;
    @Column(nullable = false) private String menu;
    @Column(nullable = false) private int partNum;
    @Column(nullable = false) private int price;
    @Column private String postBody;
    @Column(nullable = false) private String createdAt; // SimpleDateFormat 사용해서 자료형 String으로 변경

}
