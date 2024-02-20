package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentListDto {
    private Long commentId;
    private String nickname;
    private String commentBody;
    private String createdAt;
}
