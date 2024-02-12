package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class PostDetailDto {
    private String location;
    private String restaurant;
    private String menu;
    private int partNum;
    private int price;
    private String postBody;
}
