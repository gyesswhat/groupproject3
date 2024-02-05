package com.example.delivery.dto;

import com.example.delivery.entity.Post;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@AllArgsConstructor
@ToString
public class PostDto {
    // userId	int
    //location	String
    //category	String
    //restaurant	String
    //menu	String
    //partNum	int
    //price	int
    //postBody	String
    private Integer postId;
    private Integer userId;
    private String location;
    private String category;
    private String restaurant;
    private String menu;
    private int partNum;
    private int price;
    private String postBody;
    private Timestamp createdAt;

    public Post toEntity() {
        return new Post(postId, userId, location, category, restaurant, menu, partNum, price, postBody, createdAt);
    }
}
