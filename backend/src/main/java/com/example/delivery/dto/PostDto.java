package com.example.delivery.dto;

import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long userId;
    private String location;
    private String category;
    private String restaurant;
    private String menu;
    private int partNum;
    private int price;
    private String postBody;

    public Post toEntity(User user) {
        return new Post(null, user, location, category, restaurant, menu, partNum, price, postBody, null, 4);
    }
}
