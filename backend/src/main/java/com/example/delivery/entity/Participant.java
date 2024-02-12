package com.example.delivery.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Participant {
    @Id
    @ManyToOne
    @JoinColumn(name="post_postId")
    private Post post;
    @Id
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(nullable = false)
    private String joinedAt;
    @Column(nullable = false)
    private Integer status;
    // 0(방장), 1(입금전), 2(입금확인중), 3(입금확인완료)
}
