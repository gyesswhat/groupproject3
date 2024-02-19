package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostListDto {
    private Long postId;
    private String createdAt;
    private String restaurant;
    private String menu;
    private Integer price;
    private Integer partNum;
    private String nickname;
    private Integer isValid;
}
