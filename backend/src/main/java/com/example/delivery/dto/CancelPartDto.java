package com.example.delivery.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CancelPartDto {
    //참여자는
    //Postid userid DTO list (참여자만)
    private Long postId;
    private Long userId;
}
