package com.example.delivery.dto;

import com.example.delivery.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@AllArgsConstructor
@ToString
public class ParticipantDto {
    private Integer postId; // 외래 키 지정 어떻게?
    private Integer userId; // 외래 키 지정 어떻게?
    private Timestamp joinedAt;
    private String status;

    private Participant toEntity() {
        return new Participant(postId, userId, joinedAt, status);
    }
}
