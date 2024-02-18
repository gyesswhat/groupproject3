package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDetailDto {
    private Long userId;
    private String location;
    private String restaurant;
    private String menu;
    private Integer partNum;
    private Integer price;
    private String postBody;
}
