package com.example.delivery.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
public class ParticipantPK implements Serializable {
    private Long postId;
    private Long userId;
}
