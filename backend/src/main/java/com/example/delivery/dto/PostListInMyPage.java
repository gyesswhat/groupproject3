package com.example.delivery.dto;

import lombok.Data;

@Data
public class PostListInMyPage {
    private String restaurant;
    private String menu;
    private Integer price;
    private Integer partNum;
    private String nickname;
    private String createdAt;
    private Integer isValid;
}
