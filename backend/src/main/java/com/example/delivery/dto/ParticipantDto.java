package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class ParticipantDto {
    private Long postId;
    private Long userId;
    private String joinedAt;
    private Integer status;
}
