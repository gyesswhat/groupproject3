package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantListDto {
    private String nickname;
    private String joinedAt;
    private Integer status;
    private String account;
    private String bank;
}
