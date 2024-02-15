package com.example.delivery.dto;

import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public class PostDto {
    private Long postId;
    private Long userId;
    private String location;
    private String category;
    private String restaurant;
    private String menu;
    private int partNum;
    private int price;
    private String postBody;
    private String createdAt;
    private int isValid;

    public Post toEntity(User user) {
        return new Post(postId, user, location, category, restaurant, menu, partNum, price, postBody, createdAt, 4);
    }
}
