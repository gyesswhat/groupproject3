package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@AllArgsConstructor
@ToString
public class PostDetailDto {
    private Timestamp createdAt;
    private String location;
    private String restaurant;
    private String menu;
    private int partNum;
    private int price;
    private String postBody; // sql 자료형 중에 TEXT 이거 괜찮은건지... 닉네임은 안 돌려줘도 되나??
}
