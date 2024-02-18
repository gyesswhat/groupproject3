package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostListDto {
    private String createdAt;
    private String restaurant;
    private String menu;
    private Integer price;
    private Integer partNum;
    private String nickname;
    private Integer isValid;
}
