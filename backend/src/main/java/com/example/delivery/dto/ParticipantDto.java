package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDto {
    private Long postId;
    private Long userId;
    private String joinedAt;
    private Integer status;
}
