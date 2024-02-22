package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostHistoryDto {
    private Long postId;
    private String createdAt;
    private String nickname;
    private String restaurant;
    private String menu;
    private Integer price;
    private Integer partNum;
    private Integer isValid;
}
