package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class PostListDto {
    private String createdAt;
    private String restaurant;
    private String menu;
    private Integer price;
    private Integer partNum;
    private String nickname;
}
